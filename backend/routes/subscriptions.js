const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createSubscription,
  getUserSubscriptions,
  getSubscription,
  updateSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
  getAllSubscriptions
} = require('../controllers/subscriptionController');

router.route('/')
  .get(protect, getUserSubscriptions)
  .post(protect, createSubscription);

router.route('/all')
  .get(protect, authorize('admin'), getAllSubscriptions);

router.route('/:id')
  .get(protect, getSubscription)
  .put(protect, updateSubscription);

router.route('/:id/pause')
  .put(protect, pauseSubscription);

router.route('/:id/resume')
  .put(protect, resumeSubscription);

router.route('/:id/cancel')
  .put(protect, cancelSubscription);

module.exports = router;
