import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ReviewForm from './ReviewForm';

const Testimonials = () => {
    const { axios } = useAppContext();
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch approved reviews from the database
    const fetchReviews = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/review/approved');
            if (data.success) {
                setReviews(data.reviews);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Fallback testimonials if no reviews from database
    const fallbackTestimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Regular Customer",
            rating: 5,
            review: "GreenCart has completely changed my grocery shopping experience! The organic products are fresh, delivery is lightning fast, and the eco-friendly packaging makes me feel good about my purchases.",
            avatar: "👩‍🦰"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Health Enthusiast",
            rating: 5,
            review: "As someone who's passionate about healthy eating, I love how GreenCart offers such a wide variety of organic and sustainable products. The quality is consistently excellent!",
            avatar: "👨‍💼"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Busy Parent",
            rating: 5,
            review: "With two kids and a hectic schedule, GreenCart has been a lifesaver. I can order fresh groceries online and they arrive at my doorstep. The customer service is outstanding!",
            avatar: "👩‍👧‍👦"
        },
        {
            id: 4,
            name: "David Thompson",
            role: "Environmental Advocate",
            rating: 5,
            review: "I appreciate how GreenCart is committed to sustainability. From the eco-friendly packaging to supporting local farmers, they're making a real difference in the community.",
            avatar: "👨‍🌾"
        },
        {
            id: 5,
            name: "Lisa Park",
            role: "Food Blogger",
            rating: 5,
            review: "The quality of produce from GreenCart is unmatched! As a food blogger, I need the best ingredients, and they never disappoint. Highly recommend!",
            avatar: "👩‍🍳"
        },
        {
            id: 6,
            name: "Robert Wilson",
            role: "Senior Citizen",
            rating: 5,
            review: "At my age, going to the grocery store can be challenging. GreenCart's home delivery service has made my life so much easier. The staff is always friendly and helpful.",
            avatar: "👴"
        }
    ];

    // Use database reviews if available, otherwise use fallback
    const displayReviews = reviews.length > 0 ? reviews : fallbackTestimonials;

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"}>
                ★
            </span>
        ));
    };

    const getAvatar = (name) => {
        const avatars = ["👩‍🦰", "👨‍💼", "👩‍👧‍👦", "👨‍🌾", "👩‍🍳", "👴", "👩‍🎓", "👨‍💻"];
        const index = name.length % avatars.length;
        return avatars[index];
    };

    return (
        <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our valued customers have to say about their GreenCart experience.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        // Loading skeleton
                        [...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                                <div className="flex items-center mb-4">
                                    <div className="flex text-lg text-gray-300">
                                        {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                                    </div>
                                </div>
                                <div className="space-y-2 mb-6">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                    <div className="space-y-1">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        displayReviews.map((testimonial) => (
                            <div
                                key={testimonial._id || testimonial.id}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                            >
                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    <div className="flex text-lg">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-500">
                                        {testimonial.rating}.0
                                    </span>
                                </div>

                                {/* Review Text */}
                                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                                    "{testimonial.review}"
                                </blockquote>

                                {/* Customer Info */}
                                <div className="flex items-center">
                                    <div className="text-3xl mr-4">
                                        {testimonial.avatar || getAvatar(testimonial.customerName || testimonial.name)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {testimonial.customerName || testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Join Thousands of Happy Customers
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Experience the convenience of fresh, organic groceries delivered to your doorstep. 
                            Start your GreenCart journey today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
                                Start Shopping Now
                            </button>
                            <button 
                                onClick={() => setIsReviewFormOpen(true)}
                                className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200"
                            >
                                Write a Review
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
                        <div className="text-gray-600">Happy Customers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
                        <div className="text-gray-600">Average Rating</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                        <div className="text-gray-600">Orders Delivered</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                        <div className="text-gray-600">Customer Support</div>
                    </div>
                </div>
            </div>

            {/* Review Form Modal */}
            <ReviewForm 
                isOpen={isReviewFormOpen}
                onClose={() => setIsReviewFormOpen(false)}
                onSuccess={fetchReviews}
            />
        </section>
    );
};

export default Testimonials; 