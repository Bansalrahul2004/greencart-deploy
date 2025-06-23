import Review from '../models/Review.js';

// Submit a new review
const submitReview = async (req, res) => {
    try {
        const { customerName, customerEmail, rating, review, role } = req.body;

        // Validate required fields
        if (!customerName || !customerEmail || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Validate review length
        if (review.length > 500) {
            return res.status(400).json({
                success: false,
                message: 'Review must be less than 500 characters'
            });
        }

        // Create new review
        const newReview = new Review({
            customerName,
            customerEmail,
            rating,
            review,
            role: role || 'Customer'
        });

        await newReview.save();

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully! It will be visible after approval.',
            review: newReview
        });

    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit review'
        });
    }
};

// Get all approved reviews
const getApprovedReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ isApproved: true })
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        });
    }
};

// Get all reviews (for admin/seller dashboard)
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {
        console.error('Error fetching all reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        });
    }
};

// Approve a review (for admin/seller)
const approveReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findByIdAndUpdate(
            reviewId,
            { isApproved: true },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review approved successfully',
            review
        });

    } catch (error) {
        console.error('Error approving review:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to approve review'
        });
    }
};

// Delete a review (for admin/seller)
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findByIdAndDelete(reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete review'
        });
    }
};

export {
    submitReview,
    getApprovedReviews,
    getAllReviews,
    approveReview,
    deleteReview
}; 