import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true, ref: 'user'},
    items: [{
        product: {type: String, required: true, ref: 'product'},
        quantity: {type: Number, required: true}
    }],
    amount: {type: Number, required: true},
    address: {type: String, required: true, ref: 'address'},
    status: {
        type: String, 
        enum: ['Order Placed', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'],
        default: 'Order Placed'
    },
    paymentType: {type: String, required: true},
    isPaid: {type: Boolean, required: true, default: false},
    // Order tracking fields
    trackingNumber: {type: String, default: null},
    estimatedDelivery: {type: Date, default: null},
    actualDelivery: {type: Date, default: null},
    // Order timeline for tracking
    timeline: [{
        status: {type: String, required: true},
        description: {type: String, required: true},
        timestamp: {type: Date, default: Date.now},
        location: {type: String, default: null}
    }],
    // Notification preferences
    notifications: {
        email: {type: Boolean, default: true},
        sms: {type: Boolean, default: false},
        push: {type: Boolean, default: true}
    },
    // Delivery details
    deliveryPartner: {type: String, default: null},
    deliveryNotes: {type: String, default: null},
    // Return/refund fields
    returnRequested: {type: Boolean, default: false},
    returnReason: {type: String, default: null},
    refundStatus: {
        type: String,
        enum: ['None', 'Requested', 'Approved', 'Processed', 'Completed'],
        default: 'None'
    }
},{ timestamps: true })

const Order = mongoose.models.order || mongoose.model('order', orderSchema)

export default Order