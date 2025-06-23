import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updateForm, setUpdateForm] = useState({
        status: '',
        trackingNumber: '',
        deliveryPartner: '',
        estimatedDelivery: '',
        location: ''
    });
    const { axios, currency } = useAppContext();

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/seller');
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/order/update-status', {
                orderId: selectedOrder._id,
                ...updateForm
            });
            
            if (data.success) {
                setSelectedOrder(null);
                setUpdateForm({
                    status: '',
                    trackingNumber: '',
                    deliveryPartner: '',
                    estimatedDelivery: '',
                    location: ''
                });
                fetchOrders(); // Refresh orders
                alert('Order status updated successfully!');
            }
        } catch (error) {
            console.log(error);
            alert('Failed to update order status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Order Placed':
                return 'bg-blue-100 text-blue-800';
            case 'Confirmed':
                return 'bg-yellow-100 text-yellow-800';
            case 'Processing':
                return 'bg-orange-100 text-orange-800';
            case 'Shipped':
                return 'bg-purple-100 text-purple-800';
            case 'Out for Delivery':
                return 'bg-indigo-100 text-indigo-800';
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
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
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Order Management</h2>
                <p className="text-gray-600">Total Orders: {orders.length}</p>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="border border-gray-300 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold">Order #{order._id.slice(-8)}</h3>
                                <p className="text-sm text-gray-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                                <p className="text-lg font-semibold mt-1">{currency}{order.amount}</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-4">
                            <h4 className="font-medium mb-2">Items:</h4>
                            <div className="space-y-2">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                                        <img 
                                            src={item.product.image[0]} 
                                            alt={item.product.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.product.name}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">{currency}{item.product.offerPrice * item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                                <span className="text-gray-600">Payment:</span>
                                <p className="font-medium">{order.paymentType}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Paid:</span>
                                <p className="font-medium">{order.isPaid ? 'Yes' : 'No'}</p>
                            </div>
                            {order.trackingNumber && (
                                <div>
                                    <span className="text-gray-600">Tracking:</span>
                                    <p className="font-medium">{order.trackingNumber}</p>
                                </div>
                            )}
                            {order.estimatedDelivery && (
                                <div>
                                    <span className="text-gray-600">Est. Delivery:</span>
                                    <p className="font-medium">
                                        {new Date(order.estimatedDelivery).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Update Status Button */}
                        <button
                            onClick={() => setSelectedOrder(order)}
                            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90"
                        >
                            Update Status
                        </button>
                    </div>
                ))}
            </div>

            {/* Update Status Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Update Order Status</h3>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleStatusUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={updateForm.status}
                                    onChange={(e) => setUpdateForm({...updateForm, status: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tracking Number
                                </label>
                                <input
                                    type="text"
                                    value={updateForm.trackingNumber}
                                    onChange={(e) => setUpdateForm({...updateForm, trackingNumber: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter tracking number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Delivery Partner
                                </label>
                                <input
                                    type="text"
                                    value={updateForm.deliveryPartner}
                                    onChange={(e) => setUpdateForm({...updateForm, deliveryPartner: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., FedEx, UPS, DHL"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Estimated Delivery
                                </label>
                                <input
                                    type="date"
                                    value={updateForm.estimatedDelivery}
                                    onChange={(e) => setUpdateForm({...updateForm, estimatedDelivery: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={updateForm.location}
                                    onChange={(e) => setUpdateForm({...updateForm, location: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., Warehouse, Distribution Center"
                                />
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90"
                                >
                                    Update Status
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedOrder(null)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagement; 