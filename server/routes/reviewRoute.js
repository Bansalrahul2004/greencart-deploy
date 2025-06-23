import express from 'express';
import {
    submitReview,
    getApprovedReviews,
    getAllReviews,
    approveReview,
    deleteReview
} from '../controllers/reviewController.js';
import authSeller from '../middlewares/authSeller.js';

const router = express.Router();

// Public routes
router.post('/submit', submitReview);
router.get('/approved', getApprovedReviews);

// Protected routes (for sellers/admins)
router.get('/all', authSeller, getAllReviews);
router.put('/approve/:reviewId', authSeller, approveReview);
router.delete('/:reviewId', authSeller, deleteReview);

export default router; 