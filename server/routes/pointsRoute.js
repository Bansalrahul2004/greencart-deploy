import express from 'express';
import {
    getUserPoints,
    getPointsHistory,
    redeemPoints,
    getRedemptionOptions
} from '../controllers/pointsController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

// All routes require user authentication
router.use(authUser);

// Get user's points information
router.get('/user', getUserPoints);

// Get user's points history
router.get('/history', getPointsHistory);

// Get redemption options
router.get('/redemption-options', getRedemptionOptions);

// Redeem points for discount
router.post('/redeem', redeemPoints);

export default router; 