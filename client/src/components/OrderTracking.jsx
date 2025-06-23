import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const OrderTracking = ({ orderId, onClose }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { axios, user, currency } = useAppContext();

    const fetchOrderTracking = async () => {
        try {
            console.log('🔍 Fetching order tracking for:', orderId);
            const { data } = await axios.get(`/api/order/tracking/${orderId}`);
            console.log('📦 Order tracking response:', data);
            if (data.success) {
                setOrder(data.order);
            } else {
                console.error('❌ Order tracking failed:', data.message);
            }
        } catch (error) {
            console.error('❌ Error fetching order tracking:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchOrderTracking();
        }
    }, [orderId]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Order Placed':
                return 'bg-blue-500';
            case 'Confirmed':
                return 'bg-yellow-500';
            case 'Processing':
                return 'bg-orange-500';
            case 'Shipped':
                return 'bg-purple-500';
            case 'Out for Delivery':
                return 'bg-indigo-500';
            case 'Delivered':
                return 'bg-green-500';
            case 'Cancelled':
                return 'bg-red-500';
            case 'Return Requested':
                return 'bg-pink-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Order Placed':
                return '📋';
            case 'Confirmed':
                return '✅';
            case 'Processing':
                return '⚙️';
            case 'Shipped':
                return '📦';
            case 'Out for Delivery':
                return '🚚';
            case 'Delivered':
                return '🎉';
            case 'Cancelled':
                return '❌';
            case 'Return Requested':
                return '🔄';
            default:
                return '📝';
        }
    };

    const getProgressPercentage = (status) => {
        switch (status) {
            case 'Order Placed':
                return 20;
            case 'Confirmed':
                return 40;
            case 'Processing':
                return 60;
            case 'Shipped':
                return 80;
            case 'Out for Delivery':
                return 90;
            case 'Delivered':
                return 100;
            default:
                return 0;
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Loading Order Details</h3>
                        <p className="text-gray-600 text-center">Fetching your order information...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">❌</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Order Not Found</h3>
                        <p className="text-gray-600 mb-6">The order you're looking for could not be found in our system.</p>
                        <button
                            onClick={onClose}
                            className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const progressPercentage = getProgressPercentage(order.status);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold">Order Tracking</h2>
                            <p className="text-white/90 mt-1">Track your order in real-time</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white text-3xl transition-colors duration-200"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                    {/* Order Info Cards */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">#</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Order ID</p>
                                        <p className="text-lg font-bold text-blue-800">{order._id.slice(-8)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-lg">💰</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-600 font-medium">Total Amount</p>
                                        <p className="text-lg font-bold text-green-800">{currency}{order.amount}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-lg">💳</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-purple-600 font-medium">Payment</p>
                                        <p className="text-lg font-bold text-purple-800">{order.paymentType}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl border border-orange-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-lg">📅</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-orange-600 font-medium">Order Date</p>
                                        <p className="text-lg font-bold text-orange-800">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xl font-bold text-gray-800">Order Progress</h3>
                                <span className="text-sm font-medium text-gray-600">{progressPercentage}% Complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Current Status */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl mb-8 border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Current Status</h3>
                            <div className="flex items-center space-x-4">
                                <div className={`w-16 h-16 ${getStatusColor(order.status)} rounded-full flex items-center justify-center shadow-lg`}>
                                    <span className="text-2xl">{getStatusIcon(order.status)}</span>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-800">{order.status}</h4>
                                    <p className="text-gray-600">Your order is currently {order.status.toLowerCase()}</p>
                                </div>
                            </div>
                            
                            {order.trackingNumber && (
                                <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg">📦</span>
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">Tracking Number</p>
                                            <p className="text-lg font-mono font-bold text-gray-800">{order.trackingNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {order.estimatedDelivery && (
                                <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg">📅</span>
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">Estimated Delivery</p>
                                            <p className="text-lg font-bold text-gray-800">
                                                {new Date(order.estimatedDelivery).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Timeline */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Order Timeline</h3>
                            <div className="space-y-6">
                                {order.timeline && order.timeline.map((entry, index) => (
                                    <div key={index} className="relative">
                                        <div className="flex items-start space-x-4">
                                            <div className="relative">
                                                <div className={`w-4 h-4 ${getStatusColor(entry.status)} rounded-full shadow-lg`}></div>
                                                {index < order.timeline.length - 1 && (
                                                    <div className="absolute top-4 left-2 w-0.5 h-12 bg-gray-300"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-2xl">{getStatusIcon(entry.status)}</span>
                                                        <h4 className="text-lg font-bold text-gray-800">{entry.status}</h4>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(entry.timestamp).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-2">{entry.description}</p>
                                                {entry.location && (
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                        <span>📍</span>
                                                        <span>{entry.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Order Items</h3>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden">
                                                <img 
                                                    src={item.product.image[0]} 
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-bold text-gray-800">{item.product.name}</h4>
                                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                <p className="text-sm text-gray-500">Category: {item.product.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-primary">{currency}{item.product.offerPrice * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Return Request Button */}
                        {order.status === 'Delivered' && !order.returnRequested && (
                            <div className="mb-8">
                                <button
                                    className="w-full bg-red-500 text-white py-4 px-6 rounded-2xl hover:bg-red-600 transition-colors duration-200 font-bold text-lg"
                                    onClick={() => {
                                        alert('Return request functionality would be implemented here');
                                    }}
                                >
                                    🔄 Request Return
                                </button>
                            </div>
                        )}

                        {/* Return Status */}
                        {order.returnRequested && (
                            <div className="mb-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                                <h3 className="text-xl font-bold text-yellow-800 mb-4">Return Status</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-yellow-700">Status:</span>
                                        <span className="font-bold text-yellow-800">{order.refundStatus}</span>
                                    </div>
                                    {order.returnReason && (
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-yellow-700">Reason:</span>
                                            <span className="text-yellow-800">{order.returnReason}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking; 