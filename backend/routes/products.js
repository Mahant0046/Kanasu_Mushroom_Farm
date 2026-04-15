const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { upload, uploadMultiple } = require('../middleware/upload');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  updateStock
} = require('../controllers/productController');

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), uploadMultiple('images', 5), createProduct);

router.route('/featured')
  .get(getFeaturedProducts);

router.route('/:slug')
  .get(getProduct);

router.route('/:id')
  .get(protect, authorize('admin'), getProduct)
  .put(protect, authorize('admin'), uploadMultiple('images', 5), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

router.patch('/:id/stock', protect, authorize('admin'), updateStock);

module.exports = router;
