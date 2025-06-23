import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const AnalyticsDashboard = () => {
    const [analytics, setAnalytics] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        todayOrders: 0,
        todayRevenue: 0,
        popularProducts: [],
        recentOrders: [],
        monthlyRevenue: 0,
        averageOrderValue: 0
    });
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('all'); // all, today, week, month
    const { axios, currency } = useAppContext();

    const fetchAnalytics = async () => {
        try {
            const { data } = await axios.get('/api/order/seller');
            if (data.success) {
                const orders = data.orders;
                
                // Calculate analytics
                const totalOrders = orders.length;
                const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
                
                // Today's data
                const today = new Date().toDateString();
                const todayOrders = orders.filter(order => 
                    new Date(order.createdAt).toDateString() === today
                );
                const todayRevenue = todayOrders.reduce((sum, order) => sum + order.amount, 0);
                
                // Popular products
                const productCount = {};
                orders.forEach(order => {
                    order.items.forEach(item => {
                        const productName = item.product.name;
                        productCount[productName] = (productCount[productName] || 0) + item.quantity;
                    });
                });
                
                const popularProducts = Object.entries(productCount)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);
                
                // Recent orders (last 5)
                const recentOrders = orders
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);
                
                // Monthly revenue (current month)
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                const monthlyOrders = orders.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
                });
                const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.amount, 0);
                
                // Average order value
                const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
                
                setAnalytics({
                    totalOrders,
                    totalRevenue,
                    todayOrders: todayOrders.length,
                    todayRevenue,
                    popularProducts,
                    recentOrders,
                    monthlyRevenue,
                    averageOrderValue
                });
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'Order Placed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setTimeRange('today')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            timeRange === 'today' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setTimeRange('week')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            timeRange === 'week' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        This Week
                    </button>
                    <button
                        onClick={() => setTimeRange('month')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            timeRange === 'month' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        This Month
                    </button>
                    <button
                        onClick={() => setTimeRange('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            timeRange === 'all' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        All Time
                    </button>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Orders */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-600 font-medium">Total Orders</p>
                            <p className="text-3xl font-bold text-blue-800">{analytics.totalOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">📦</span>
                        </div>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-600 font-medium">Total Revenue</p>
                            <p className="text-3xl font-bold text-green-800">{currency}{analytics.totalRevenue}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">💰</span>
                        </div>
                    </div>
                </div>

                {/* Today's Orders */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-600 font-medium">Today's Orders</p>
                            <p className="text-3xl font-bold text-purple-800">{analytics.todayOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">📅</span>
                        </div>
                    </div>
                </div>

                {/* Average Order Value */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-600 font-medium">Avg Order Value</p>
                            <p className="text-3xl font-bold text-orange-800">{currency}{analytics.averageOrderValue.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">📊</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Revenue */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Revenue</h3>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">📈</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">{currency}{analytics.monthlyRevenue}</p>
                            <p className="text-gray-600">This month's total revenue</p>
                        </div>
                    </div>
                </div>

                {/* Today's Revenue */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Revenue</h3>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">💵</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">{currency}{analytics.todayRevenue}</p>
                            <p className="text-gray-600">Revenue generated today</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Products */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Products</h3>
                <div className="space-y-3">
                    {analytics.popularProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                </div>
                                <span className="font-medium text-gray-800">{product.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Sold:</span>
                                <span className="font-bold text-primary">{product.count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
                <div className="space-y-3">
                    {analytics.recentOrders.map((order, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-600 font-bold">#{order._id.slice(-4)}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                                <span className="font-bold text-gray-800">{currency}{order.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard; 