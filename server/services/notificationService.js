import nodemailer from 'nodemailer';

// Create transporter for sending emails
let transporter = null;

// Initialize transporter if email credentials are available
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    console.log('📧 Email service initialized successfully');
} else {
    console.log('⚠️ Email credentials not configured. Notifications will be logged only.');
}

// Email templates for different order statuses
const emailTemplates = {
    orderPlaced: (orderId, customerName) => ({
        subject: 'Order Confirmed - GreenCart',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4CAF50;">Order Confirmed!</h2>
                <p>Dear ${customerName},</p>
                <p>Your order <strong>#${orderId}</strong> has been successfully placed and confirmed.</p>
                <p>We'll keep you updated on your order status. You can track your order anytime from your account.</p>
                <p>Thank you for choosing GreenCart!</p>
            </div>
        `
    }),
    
    orderConfirmed: (orderId, customerName) => ({
        subject: 'Order Processing Started - GreenCart',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2196F3;">Order Processing Started</h2>
                <p>Dear ${customerName},</p>
                <p>Your order <strong>#${orderId}</strong> is now being processed and prepared for shipping.</p>
                <p>We'll notify you once your order is shipped.</p>
            </div>
        `
    }),
    
    orderShipped: (orderId, customerName, trackingNumber) => ({
        subject: 'Order Shipped - GreenCart',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #FF9800;">Order Shipped!</h2>
                <p>Dear ${customerName},</p>
                <p>Your order <strong>#${orderId}</strong> has been shipped!</p>
                ${trackingNumber ? `<p>Tracking Number: <strong>${trackingNumber}</strong></p>` : ''}
                <p>You can track your delivery in real-time from your account.</p>
            </div>
        `
    }),
    
    outForDelivery: (orderId, customerName) => ({
        subject: 'Out for Delivery - GreenCart',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #9C27B0;">Out for Delivery</h2>
                <p>Dear ${customerName},</p>
                <p>Your order <strong>#${orderId}</strong> is out for delivery!</p>
                <p>Please ensure someone is available to receive your package.</p>
            </div>
        `
    }),
    
    orderDelivered: (orderId, customerName) => ({
        subject: 'Order Delivered - GreenCart',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4CAF50;">Order Delivered!</h2>
                <p>Dear ${customerName},</p>
                <p>Your order <strong>#${orderId}</strong> has been successfully delivered!</p>
                <p>We hope you enjoy your purchase. If you have any issues, please contact our support team.</p>
                <p>Thank you for shopping with GreenCart!</p>
            </div>
        `
    }),
    
    orderCancelled: (orderId, customerName) => ({
        subject: 'Order Cancelled - GreenCart',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #F44336;">Order Cancelled</h2>
                <p>Dear ${customerName},</p>
                <p>Your order <strong>#${orderId}</strong> has been cancelled.</p>
                <p>If you have any questions, please contact our support team.</p>
            </div>
        `
    })
};

// Send email notification
export const sendEmailNotification = async (to, template, data) => {
    try {
        const emailContent = emailTemplates[template](...data);
        
        // Log the notification
        console.log('📧 EMAIL NOTIFICATION:');
        console.log('To:', to);
        console.log('Subject:', emailContent.subject);
        console.log('Content:', emailContent.html);
        console.log('---');
        
        // Send real email if transporter is configured
        if (transporter) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: to,
                subject: emailContent.subject,
                html: emailContent.html
            };
            
            await transporter.sendMail(mailOptions);
            console.log(`✅ Email sent successfully to ${to}`);
            return true;
        } else {
            console.log('⚠️ Email not sent - transporter not configured');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error sending email notification:', error);
        return false;
    }
};

// Send order status update notification
export const sendOrderStatusNotification = async (userEmail, userName, orderId, status, trackingNumber = null) => {
    let template = '';
    let data = [];
    
    switch (status) {
        case 'Order Placed':
            template = 'orderPlaced';
            data = [orderId, userName];
            break;
        case 'Confirmed':
            template = 'orderConfirmed';
            data = [orderId, userName];
            break;
        case 'Shipped':
            template = 'orderShipped';
            data = [orderId, userName, trackingNumber];
            break;
        case 'Out for Delivery':
            template = 'outForDelivery';
            data = [orderId, userName];
            break;
        case 'Delivered':
            template = 'orderDelivered';
            data = [orderId, userName];
            break;
        case 'Cancelled':
            template = 'orderCancelled';
            data = [orderId, userName];
            break;
        default:
            return false;
    }
    
    return await sendEmailNotification(userEmail, template, data);
};

// Send push notification (placeholder for future implementation)
export const sendPushNotification = async (userId, title, body, data = {}) => {
    // This would integrate with a push notification service like Firebase
    console.log(`Push notification sent to user ${userId}: ${title} - ${body}`);
    return true;
};

// Send SMS notification (placeholder for future implementation)
export const sendSMSNotification = async (phoneNumber, message) => {
    // This would integrate with an SMS service like Twilio
    console.log(`SMS sent to ${phoneNumber}: ${message}`);
    return true;
}; 