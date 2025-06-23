// Points calculation rules
export const POINTS_RULES = {
    // Points earned per dollar spent
    POINTS_PER_DOLLAR: 10,
    
    // Minimum points required for redemption
    MIN_POINTS_REDEMPTION: 100,
    
    // Points to currency conversion (1 point = $0.01)
    POINTS_TO_CURRENCY: 0.01,
    
    // Currency to points conversion ($1 = 100 points)
    CURRENCY_TO_POINTS: 100,
    
    // Membership tier requirements
    MEMBERSHIP_TIERS: {
        Bronze: { minSpent: 0, pointsMultiplier: 1.0 },
        Silver: { minSpent: 100, pointsMultiplier: 1.2 },
        Gold: { minSpent: 500, pointsMultiplier: 1.5 },
        Platinum: { minSpent: 1000, pointsMultiplier: 2.0 }
    },
    
    // Points expiration (in days)
    POINTS_EXPIRATION_DAYS: 365
};

// Calculate points earned from order
export const calculatePointsEarned = (orderAmount, userTier = 'Bronze') => {
    const basePoints = Math.floor(orderAmount * POINTS_RULES.POINTS_PER_DOLLAR);
    const multiplier = POINTS_RULES.MEMBERSHIP_TIERS[userTier].pointsMultiplier;
    return Math.floor(basePoints * multiplier);
};

// Calculate currency value from points
export const calculatePointsValue = (points) => {
    return points * POINTS_RULES.POINTS_TO_CURRENCY;
};

// Calculate points needed for currency amount
export const calculatePointsNeeded = (currencyAmount) => {
    return Math.ceil(currencyAmount * POINTS_RULES.CURRENCY_TO_POINTS);
};

// Check if user can redeem points
export const canRedeemPoints = (userPoints, requestedPoints) => {
    return userPoints >= requestedPoints && requestedPoints >= POINTS_RULES.MIN_POINTS_REDEMPTION;
};

// Determine membership tier based on total spent
export const determineMembershipTier = (totalSpent) => {
    if (totalSpent >= POINTS_RULES.MEMBERSHIP_TIERS.Platinum.minSpent) {
        return 'Platinum';
    } else if (totalSpent >= POINTS_RULES.MEMBERSHIP_TIERS.Gold.minSpent) {
        return 'Gold';
    } else if (totalSpent >= POINTS_RULES.MEMBERSHIP_TIERS.Silver.minSpent) {
        return 'Silver';
    } else {
        return 'Bronze';
    }
};

// Get tier benefits description
export const getTierBenefits = (tier) => {
    const benefits = {
        Bronze: {
            pointsMultiplier: '1x',
            description: 'Earn 10 points per $1 spent',
            perks: ['Basic rewards program']
        },
        Silver: {
            pointsMultiplier: '1.2x',
            description: 'Earn 12 points per $1 spent',
            perks: ['20% bonus points', 'Priority customer support']
        },
        Gold: {
            pointsMultiplier: '1.5x',
            description: 'Earn 15 points per $1 spent',
            perks: ['50% bonus points', 'Free delivery', 'Exclusive offers']
        },
        Platinum: {
            pointsMultiplier: '2x',
            description: 'Earn 20 points per $1 spent',
            perks: ['100% bonus points', 'Free delivery', 'VIP support', 'Early access to sales']
        }
    };
    
    return benefits[tier] || benefits.Bronze;
};

// Format points for display
export const formatPoints = (points) => {
    return points.toLocaleString();
};

// Format currency for display
export const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
}; 