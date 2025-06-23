import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ReviewManagement = () => {
    const { axios } = useAppContext();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/review/all');
            if (data.success) {
                setReviews(data.reviews);
            }
        } catch (error) {
            toast.error('Failed to fetch reviews');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleApprove = async (reviewId) => {
        try {
            const { data } = await axios.put(`/api/review/approve/${reviewId}`);
            if (data.success) {
                toast.success('Review approved successfully!');
                fetchReviews();
            }
        } catch (error) {
            toast.error('Failed to approve review');
        }
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) {
            return;
        }

        try {
            const { data } = await axios.delete(`/api/review/${reviewId}`);
            if (data.success) {
                toast.success('Review deleted successfully!');
                fetchReviews();
            }
        } catch (error) {
            toast.error('Failed to delete review');
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"}>
                ★
            </span>
        ));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                <div className="text-sm text-gray-600">
                    Total: {reviews.length} reviews
                </div>
            </div>

            {reviews.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                    <p className="text-gray-600">Customer reviews will appear here once they start submitting them.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className={`bg-white rounded-lg shadow-sm border p-6 ${
                                !review.isApproved ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex text-lg">
                                        {renderStars(review.rating)}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {review.rating}.0
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {!review.isApproved && (
                                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                            Pending Approval
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-500">
                                        {formatDate(review.createdAt)}
                                    </span>
                                </div>
                            </div>

                            <blockquote className="text-gray-700 mb-4 italic">
                                "{review.review}"
                            </blockquote>

                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {review.customerName}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {review.role} • {review.customerEmail}
                                    </p>
                                </div>

                                <div className="flex space-x-2">
                                    {!review.isApproved && (
                                        <button
                                            onClick={() => handleApprove(review._id)}
                                            className="px-3 py-1 text-xs bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                            {reviews.length}
                        </div>
                        <div className="text-sm text-gray-600">Total Reviews</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {reviews.filter(r => r.isApproved).length}
                        </div>
                        <div className="text-sm text-gray-600">Approved</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                            {reviews.filter(r => !r.isApproved).length}
                        </div>
                        <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {reviews.length > 0 
                                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                                : '0.0'
                            }
                        </div>
                        <div className="text-sm text-gray-600">Avg Rating</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewManagement; 