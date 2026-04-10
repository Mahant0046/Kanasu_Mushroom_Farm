const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  markHelpful
} = require('../controllers/reviewController');

router.route('/product/:productId')
  .get(getProductReviews);

router.route('/')
  .post(protect, createReview);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

router.route('/:id/helpful')
  .post(protect, markHelpful);

module.exports = router;
