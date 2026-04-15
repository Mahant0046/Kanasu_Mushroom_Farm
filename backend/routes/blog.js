const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { upload, uploadMultiple } = require('../middleware/upload');
const {
  getBlogs,
  getBlog,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogCategories,
  addComment,
  getFeaturedBlogs
} = require('../controllers/blogController');

router.route('/')
  .get(getBlogs)
  .post(protect, authorize('admin'), uploadMultiple('images', 5), createBlog);

router.route('/categories')
  .get(getBlogCategories);

router.route('/featured')
  .get(getFeaturedBlogs);

// ID routes must come before slug routes to avoid conflicts
router.route('/:id')
  .get(getBlogById)
  .put(protect, authorize('admin'), uploadMultiple('images', 5), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);

router.route('/:id/comments')
  .post(protect, addComment);

router.route('/:slug')
  .get(getBlog);

module.exports = router;
