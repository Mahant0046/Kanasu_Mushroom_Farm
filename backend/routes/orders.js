const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');

router.route('/')
  .get(protect, getUserOrders)
  .post(protect, createOrder);

router.route('/all')
  .get(protect, authorize('admin'), getAllOrders);

router.route('/:id')
  .get(protect, getOrder);

router.route('/:id/status')
  .put(protect, authorize('admin'), updateOrderStatus);

router.route('/:id/cancel')
  .put(protect, cancelOrder);

module.exports = router;
