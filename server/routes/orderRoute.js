import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, updateOrderStatus, getOrderTracking, requestOrderReturn, cancelOrder } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.put('/update-status', authSeller, updateOrderStatus)
orderRouter.get('/tracking/:orderId', authUser, getOrderTracking)
orderRouter.post('/return-request', authUser, requestOrderReturn)
orderRouter.post('/cancel', authUser, cancelOrder)

export default orderRouter;