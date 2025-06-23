import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const PointsDisplay = () => {
    const { axios, user } = useAppContext();
    const [pointsData, setPointsData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPoints = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/points/user');
            if (data.success) {
                setPointsData(data.data);
            }
        } catch (error) {
            console.error('Error fetching points:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchPoints();
        }
    }, [user]);

    if (!user) return null;

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border p-4 animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-6 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        );
    }

    if (!pointsData) return null;

    const getTierColor = (tier) => {
        switch (tier) {
            case 'Bronze': return 'bg-amber-100 text-amber-800';
            case 'Silver': return 'bg-gray-100 text-gray-800';
            case 'Gold': return 'bg-yellow-100 text-yellow-800';
            case 'Platinum': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTierIcon = (tier) => {
        switch (tier) {
            case 'Bronze': return '🥉';
            case 'Silver': return '🥈';
            case 'Gold': return '🥇';
            case 'Platinum': return '💎';
            default: return '⭐';
        }
    };

    // Membership tier thresholds
    const tierThresholds = [
        { name: 'Bronze', min: 0 },
        { name: 'Silver', min: 100 },
        { name: 'Gold', min: 500 },
        { name: 'Platinum', min: 1000 }
    ];

    // Find current and next tier
    const currentTierIndex = tierThresholds.findIndex(t => t.name === pointsData.membershipTier);
    const nextTier = tierThresholds[currentTierIndex + 1];
    const currentSpent = pointsData.totalSpent || 0;
    const currentMin = tierThresholds[currentTierIndex].min;
    const nextMin = nextTier ? nextTier.min : currentMin;
    const progress = nextTier ? Math.min(100, Math.round(((currentSpent - currentMin) / (nextMin - currentMin)) * 100)) : 100;
    const amountToNext = nextTier ? Math.max(0, nextMin - currentSpent) : 0;

    return (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm border border-green-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Loyalty Points</h3>
                    <p className="text-sm text-gray-600">Earn points with every purchase</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(pointsData.membershipTier)}`}>
                    {getTierIcon(pointsData.membershipTier)} {pointsData.membershipTier}
                </div>
            </div>

            {/* Progress Bar to Next Tier */}
            <div className="mb-6">
                {nextTier ? (
                    <>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-700 font-medium">Progress to {nextTier.name} Tier</span>
                            <span className="text-sm text-gray-500">${amountToNext.toFixed(2)} to go</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>${currentSpent.toFixed(2)} spent</span>
                            <span>${nextMin} needed</span>
                        </div>
                    </>
                ) : (
                    <div className="text-sm text-green-700 font-semibold text-center mb-2">You are at the highest tier!</div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {pointsData.points.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Current Points</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                        ${pointsData.pointsValue.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Points Value</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                        {pointsData.tierBenefits.pointsMultiplier}
                    </div>
                    <div className="text-sm text-gray-600">Points Multiplier</div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Tier Benefits</h4>
                <div className="space-y-1">
                    {pointsData.tierBenefits.perks.map((perk, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                            <span className="text-green-500 mr-2">✓</span>
                            {perk}
                        </div>
                    ))}
                </div>
            </div>

            {pointsData.canRedeem ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-green-800">Ready to Redeem!</h4>
                            <p className="text-sm text-green-600">
                                You have enough points to get discounts on your next order
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                            Redeem Points
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-yellow-800">Keep Shopping!</h4>
                            <p className="text-sm text-yellow-600">
                                You need {pointsData.minPointsForRedemption - pointsData.points} more points to redeem
                            </p>
                        </div>
                        <div className="text-yellow-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PointsDisplay; 