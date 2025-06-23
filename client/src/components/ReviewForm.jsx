import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const ReviewForm = ({ isOpen, onClose, onSuccess }) => {
    const { axios } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        rating: 5,
        review: '',
        role: 'Customer'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.customerName || !formData.customerEmail || !formData.review) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (formData.review.length > 500) {
            toast.error('Review must be less than 500 characters');
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.post('/api/review/submit', formData);
            
            if (data.success) {
                toast.success(data.message);
                setFormData({
                    customerName: '',
                    customerEmail: '',
                    rating: 5,
                    review: '',
                    role: 'Customer'
                });
                onClose();
                if (onSuccess) onSuccess();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to submit review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingChange = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name *
                        </label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="Customer">Customer</option>
                            <option value="Health Enthusiast">Health Enthusiast</option>
                            <option value="Busy Parent">Busy Parent</option>
                            <option value="Environmental Advocate">Environmental Advocate</option>
                            <option value="Food Blogger">Food Blogger</option>
                            <option value="Senior Citizen">Senior Citizen</option>
                            <option value="Student">Student</option>
                            <option value="Professional">Professional</option>
                        </select>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating *
                        </label>
                        <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingChange(star)}
                                    className={`text-2xl transition-colors ${
                                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                >
                                    ★
                                </button>
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                                {formData.rating} out of 5
                            </span>
                        </div>
                    </div>

                    {/* Review */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review *
                        </label>
                        <textarea
                            name="review"
                            value={formData.review}
                            onChange={handleInputChange}
                            rows="4"
                            maxLength="500"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                            placeholder="Share your experience with GreenCart..."
                            required
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {formData.review.length}/500 characters
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                        💡 <strong>Tip:</strong> Your review will be visible on our website after approval. 
                        We appreciate honest feedback to help us improve our service!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm; 