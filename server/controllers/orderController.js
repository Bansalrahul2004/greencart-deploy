import { Order, Product, User } from "../models/index.js";
import stripe from "stripe"
import { sendOrderStatusNotification } from "../services/notificationService.js";
import { awardPointsForOrder } from "./pointsController.js";

// Helper function to add timeline entry
const addTimelineEntry = (order, status, description, location = null) => {
    order.timeline.push({
        status,
        description,
        timestamp: new Date(),
        location
    });
};

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res)=>{
    try {
        const { items, address } = req.body;
        const userId = req.user.id; // Get userId from authenticated user
        
        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }
        
        if (!userId) {
            return res.json({success: false, message: "User not authenticated"})
        }
        
        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        // Add initial timeline entry
        addTimelineEntry(order, 'Order Placed', 'Your order has been successfully placed', 'GreenCart Warehouse');
        await order.save();

        // Send notification
        const user = await User.findById(userId);
        if (user) {
            await sendOrderStatusNotification(user.email, user.name, order._id, 'Order Placed');
        }

        return res.json({success: true, message: "Order Placed Successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req, res)=>{
    try {
        const { items, address } = req.body;
        const userId = req.user.id; // Get userId from authenticated user
        const {origin} = req.headers;

        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }
        
        if (!userId) {
            return res.json({success: false, message: "User not authenticated"})
        }

        let productData = [];

        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

       const order =  await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        // Add initial timeline entry
        addTimelineEntry(order, 'Order Placed', 'Your order has been successfully placed', 'GreenCart Warehouse');
        await order.save();

    // Stripe Gateway Initialize    
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // create line items for stripe

     const line_items = productData.map((item)=>{
        return {
            price_data: {
                currency: "usd",
                product_data:{
                    name: item.name,
                },
                unit_amount: Math.floor(item.price + item.price * 0.02)  * 100
            },
            quantity: item.quantity,
        }
     })

     // create session
     const session = await stripeInstance.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${origin}/loader?next=my-orders`,
        cancel_url: `${origin}/cart`,
        metadata: {
            orderId: order._id.toString(),
            userId,
        }
     })

        return res.json({success: true, url: session.url });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Stripe Webhooks to Verify Payments Action : /stripe
export const stripeWebhooks = async (request, response)=>{
    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        response.status(400).send(`Webhook Error: ${error.message}`)
    }

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId, userId } = session.data[0].metadata;
            // Mark Payment as Paid
            const order = await Order.findByIdAndUpdate(orderId, {isPaid: true}, {new: true});
            
            // Add payment confirmation to timeline
            addTimelineEntry(order, 'Payment Confirmed', 'Payment has been successfully processed');
            await order.save();
            
            // Clear user cart
            await User.findByIdAndUpdate(userId, {cartItems: {}});
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
            
    
        default:
            console.error(`Unhandled event type ${event.type}`)
            break;
    }
    response.json({received: true});
}

// Update Order Status : /api/order/update-status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status, trackingNumber, deliveryPartner, estimatedDelivery, location } = req.body;
        
        const order = await Order.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        const oldStatus = order.status;
        order.status = status;

        // Add tracking number if provided
        if (trackingNumber) {
            order.trackingNumber = trackingNumber;
        }

        // Add delivery partner if provided
        if (deliveryPartner) {
            order.deliveryPartner = deliveryPartner;
        }

        // Add estimated delivery if provided
        if (estimatedDelivery) {
            order.estimatedDelivery = new Date(estimatedDelivery);
        }

        // Add timeline entry
        let description = '';
        switch (status) {
            case 'Confirmed':
                description = 'Your order has been confirmed and is being prepared';
                break;
            case 'Processing':
                description = 'Your order is being processed and packed';
                break;
            case 'Shipped':
                description = 'Your order has been shipped and is on its way';
                break;
            case 'Out for Delivery':
                description = 'Your order is out for delivery';
                break;
            case 'Delivered':
                description = 'Your order has been delivered successfully';
                order.actualDelivery = new Date();
                
                // Award points when order is delivered (only if not already delivered)
                if (oldStatus !== 'Delivered' && order.userId && order.amount) {
                    try {
                        await awardPointsForOrder(order.userId, order._id, order.amount);
                        console.log(`Points awarded for order ${orderId} to user ${order.userId}`);
                    } catch (pointsError) {
                        console.error('Error awarding points:', pointsError);
                        // Don't fail the order update if points awarding fails
                    }
                }
                break;
            case 'Cancelled':
                description = 'Your order has been cancelled';
                break;
            default:
                description = `Order status updated to ${status}`;
        }

        addTimelineEntry(order, status, description, location);
        await order.save();

        // Send notification to user
        const user = await User.findById(order.userId);
        if (user && order.notifications.email) {
            await sendOrderStatusNotification(user.email, user.name, orderId, status, trackingNumber);
        }

        res.json({ success: true, message: "Order status updated successfully", order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.json({ success: false, message: error.message });
    }
};

// Get Order Tracking Details : /api/order/tracking/:orderId
export const getOrderTracking = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id; // Get userId from authenticated user

        console.log('🔍 Tracking request - OrderId:', orderId, 'UserId:', userId);

        const order = await Order.findById(orderId).populate('items.product address');
        
        console.log('📦 Found order:', order ? 'Yes' : 'No');
        
        if (!order) {
            console.log('❌ Order not found in database');
            return res.json({ success: false, message: "Order not found" });
        }

        console.log('👤 Order userId:', order.userId, 'Request userId:', userId);

        // Check if user owns this order
        if (order.userId !== userId) {
            console.log('❌ Unauthorized access - user mismatch');
            return res.json({ success: false, message: "Unauthorized access" });
        }

        console.log('✅ Order tracking successful');
        res.json({ success: true, order });
    } catch (error) {
        console.error('❌ Error in getOrderTracking:', error);
        res.json({ success: false, message: error.message });
    }
};

// Request Order Return : /api/order/return-request
export const requestOrderReturn = async (req, res) => {
    try {
        const { orderId, reason } = req.body;
        const userId = req.user.id; // Get userId from authenticated user

        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        if (order.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized access" });
        }

        if (order.status !== 'Delivered') {
            return res.json({ success: false, message: "Order must be delivered to request return" });
        }

        order.returnRequested = true;
        order.returnReason = reason;
        order.refundStatus = 'Requested';
        
        addTimelineEntry(order, 'Return Requested', `Return requested: ${reason}`);
        await order.save();

        res.json({ success: true, message: "Return request submitted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res)=>{
    try {
        const userId = req.user.id; // Get userId from authenticated user
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get All Orders ( for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res)=>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}