# Order Tracking & Notifications Setup Guide

This guide will help you set up the Order Tracking & Notifications feature for your GreenCart e-commerce application.

## 🚀 Features Implemented

### For Customers:
- **Real-time Order Tracking**: Visual timeline of order progress
- **Order Status Updates**: Color-coded status indicators
- **Email Notifications**: Automatic emails for status changes
- **Return Management**: Request returns for delivered orders
- **Notification Preferences**: Control email, SMS, and push notifications

### For Sellers:
- **Order Management Dashboard**: View and manage all orders
- **Status Updates**: Update order status with tracking details
- **Bulk Operations**: Manage multiple orders efficiently
- **Delivery Tracking**: Add tracking numbers and delivery partners

## 📋 Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** database
3. **Gmail account** for email notifications
4. **Environment variables** configured

## 🔧 Setup Instructions

### 1. Environment Variables

Add these variables to your `.env` file in the server directory:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Database
MONGODB_URI=your-mongodb-connection-string

# Other existing variables...
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### 2. Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for your application
4. Use this password in `EMAIL_PASSWORD`

### 3. Install Dependencies

```bash
# In the server directory
npm install nodemailer

# In the client directory (if needed)
npm install
```

### 4. Database Migration

The Order model has been enhanced with new fields. If you have existing orders, they will work with the new system, but new orders will have enhanced tracking capabilities.

## 🎯 How to Use

### For Customers:

1. **Place an Order**: Orders automatically get initial tracking entries
2. **View Orders**: Go to "My Orders" page
3. **Track Order**: Click "Track Order" button on any order
4. **Receive Notifications**: Get email updates for status changes
5. **Request Returns**: For delivered orders, use the return request feature

### For Sellers:

1. **Access Seller Dashboard**: Go to `/seller` route
2. **View Orders**: See all orders in the Orders section
3. **Update Status**: Click "Update Status" on any order
4. **Add Tracking**: Include tracking numbers and delivery details
5. **Manage Notifications**: System automatically notifies customers

## 📧 Email Templates

The system includes pre-built email templates for:
- Order Confirmation
- Order Processing Started
- Order Shipped
- Out for Delivery
- Order Delivered
- Order Cancelled

## 🔄 Order Status Flow

1. **Order Placed** → Customer places order
2. **Confirmed** → Seller confirms order
3. **Processing** → Order is being prepared
4. **Shipped** → Order is shipped with tracking
5. **Out for Delivery** → Package is with delivery partner
6. **Delivered** → Order successfully delivered
7. **Cancelled** → Order cancelled (if applicable)

## 🛠️ API Endpoints

### New Endpoints Added:

- `PUT /api/order/update-status` - Update order status
- `GET /api/order/tracking/:orderId` - Get order tracking details
- `POST /api/order/return-request` - Request order return

### Enhanced Endpoints:

- `POST /api/order/cod` - Now includes timeline and notifications
- `POST /api/order/stripe` - Now includes timeline and notifications
- `GET /api/order/user` - Returns enhanced order data
- `GET /api/order/seller` - Returns enhanced order data

## 🎨 UI Components

### New Components:
- `OrderTracking.jsx` - Modal for detailed order tracking
- `OrderManagement.jsx` - Seller order management interface
- `NotificationSettings.jsx` - User notification preferences

### Enhanced Components:
- `MyOrders.jsx` - Now includes tracking buttons and status indicators

## 🔔 Notification System

### Email Notifications:
- Automatic emails sent on status changes
- Professional HTML templates
- Configurable sender information

### Future Enhancements:
- SMS notifications (Twilio integration)
- Push notifications (Firebase integration)
- Webhook notifications for third-party integrations

## 🚨 Troubleshooting

### Common Issues:

1. **Emails not sending**:
   - Check Gmail app password
   - Verify EMAIL_USER and EMAIL_PASSWORD in .env
   - Check Gmail security settings

2. **Order tracking not loading**:
   - Verify order ID exists
   - Check user permissions
   - Ensure database connection

3. **Status updates not working**:
   - Verify seller authentication
   - Check order ownership
   - Ensure all required fields are provided

### Debug Mode:

Add this to your server logs to debug notifications:
```javascript
console.log('Notification sent:', notificationResult);
```

## 🔮 Future Enhancements

1. **Real-time Updates**: WebSocket integration for live status updates
2. **SMS Integration**: Twilio for text message notifications
3. **Push Notifications**: Browser and mobile push notifications
4. **Delivery Integration**: Direct integration with shipping carriers
5. **Analytics Dashboard**: Order tracking analytics and insights
6. **Multi-language Support**: Internationalization for notifications

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Test with a fresh order to isolate issues

## 🎉 Success!

Once setup is complete, your GreenCart application will have a comprehensive order tracking and notification system that enhances the customer experience and streamlines seller operations. 