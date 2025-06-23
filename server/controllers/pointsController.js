import User from '../models/User.js';
import Order from '../models/Order.js';
import {
    calculatePointsEarned,
    calculatePointsValue,
    calculatePointsNeeded,
    canRedeemPoints,
    determineMembershipTier,
    getTierBenefits,
    formatPoints,
    formatCurrency,
    POINTS_RULES
} from '../services/pointsService.js';

// Get user's points information
export const getUserPoints = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const tierBenefits = getTierBenefits(user.membershipTier);
        const pointsValue = calculatePointsValue(user.points);
        const totalSpent = await (async (userId) => {
            try {
                const orders = await Order.find({ 
                    userId, 
                    status: { $in: ['delivered', 'completed'] } 
                });
                return orders.reduce((total, order) => total + order.amount, 0);
            } catch (error) {
                return 0;
            }
        })(user._id);

        res.status(200).json({
            success: true,
            data: {
                points: user.points,
                totalPointsEarned: user.totalPointsEarned,
                totalPointsRedeemed: user.totalPointsRedeemed,
                membershipTier: user.membershipTier,
                tierBenefits,
                pointsValue,
                canRedeem: user.points >= POINTS_RULES.MIN_POINTS_REDEMPTION,
                minPointsForRedemption: POINTS_RULES.MIN_POINTS_REDEMPTION,
                totalSpent
            }
        });

    } catch (error) {
        console.error('Error getting user points:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get points information'
        });
    }
};

// Get user's points history
export const getPointsHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('pointsHistory.orderId');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                pointsHistory: user.pointsHistory,
                totalPointsEarned: user.totalPointsEarned,
                totalPointsRedeemed: user.totalPointsRedeemed
            }
        });

    } catch (error) {
        console.error('Error getting points history:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get points history'
        });
    }
};

// Redeem points for discount
export const redeemPoints = async (req, res) => {
    try {
        const { pointsToRedeem } = req.body;

        if (!pointsToRedeem || pointsToRedeem <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Please specify a valid number of points to redeem'
            });
        }

        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user can redeem points
        if (!canRedeemPoints(user.points, pointsToRedeem)) {
            return res.status(400).json({
                success: false,
                message: `You need at least ${POINTS_RULES.MIN_POINTS_REDEMPTION} points to redeem. You have ${user.points} points.`
            });
        }

        // Calculate discount amount
        const discountAmount = calculatePointsValue(pointsToRedeem);

        // Update user points
        user.points -= pointsToRedeem;
        user.totalPointsRedeemed += pointsToRedeem;

        // Add to points history
        user.pointsHistory.push({
            transactionType: 'redeemed',
            amount: -pointsToRedeem,
            description: `Redeemed ${formatPoints(pointsToRedeem)} points for ${formatCurrency(discountAmount)} discount`
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: `Successfully redeemed ${formatPoints(pointsToRedeem)} points for ${formatCurrency(discountAmount)} discount`,
            data: {
                pointsRedeemed: pointsToRedeem,
                discountAmount,
                remainingPoints: user.points
            }
        });

    } catch (error) {
        console.error('Error redeeming points:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to redeem points'
        });
    }
};

// Award points for completed order
export const awardPointsForOrder = async (userId, orderId, orderAmount) => {
    try {
        // Validate inputs
        if (!userId || !orderId || !orderAmount) {
            console.error('Invalid parameters for points award:', { userId, orderId, orderAmount });
            return;
        }

        const user = await User.findById(userId);
        
        if (!user) {
            console.error('User not found for points award:', userId);
            return;
        }

        // Check if points were already awarded for this order
        const existingAward = user.pointsHistory.find(
            entry => entry.orderId && entry.orderId.toString() === orderId.toString()
        );

        if (existingAward) {
            console.log(`Points already awarded for order ${orderId}`);
            return;
        }

        // Calculate points earned
        const pointsEarned = calculatePointsEarned(orderAmount, user.membershipTier);

        // Update user points
        user.points += pointsEarned;
        user.totalPointsEarned += pointsEarned;

        // Add to points history
        user.pointsHistory.push({
            transactionType: 'earned',
            amount: pointsEarned,
            description: `Earned ${formatPoints(pointsEarned)} points from order #${orderId}`,
            orderId: orderId
        });

        // Check for membership tier upgrade
        const totalSpent = await calculateTotalSpent(userId);
        const newTier = determineMembershipTier(totalSpent);
        
        if (newTier !== user.membershipTier) {
            user.membershipTier = newTier;
            user.pointsHistory.push({
                transactionType: 'earned',
                amount: 0,
                description: `Upgraded to ${newTier} membership tier!`
            });
        }

        await user.save();

        console.log(`Awarded ${pointsEarned} points to user ${userId} for order ${orderId}`);

    } catch (error) {
        console.error('Error awarding points for order:', error);
    }
};

// Calculate total amount spent by user
const calculateTotalSpent = async (userId) => {
    try {
        const orders = await Order.find({ 
            userId, 
            status: { $in: ['delivered', 'completed'] } 
        });
        
        return orders.reduce((total, order) => total + order.amount, 0);
    } catch (error) {
        console.error('Error calculating total spent:', error);
        return 0;
    }
};

// Get points redemption options
export const getRedemptionOptions = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const options = [
            {
                points: 100,
                value: calculatePointsValue(100),
                description: 'Get $1.00 off your order'
            },
            {
                points: 250,
                value: calculatePointsValue(250),
                description: 'Get $2.50 off your order'
            },
            {
                points: 500,
                value: calculatePointsValue(500),
                description: 'Get $5.00 off your order'
            },
            {
                points: 1000,
                value: calculatePointsValue(1000),
                description: 'Get $10.00 off your order'
            }
        ].filter(option => user.points >= option.points);

        res.status(200).json({
            success: true,
            data: {
                availablePoints: user.points,
                redemptionOptions: options,
                minPointsRequired: POINTS_RULES.MIN_POINTS_REDEMPTION
            }
        });

    } catch (error) {
        console.error('Error getting redemption options:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get redemption options'
        });
    }
}; 