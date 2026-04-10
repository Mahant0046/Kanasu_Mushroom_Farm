const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { upload, uploadMultiple } = require('../middleware/upload');
const {
  getBlogs,
  getBlog,
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

router.route('/:slug')
  .get(getBlog);

router.route('/:id')
  .put(protect, authorize('admin'), uploadMultiple('images', 5), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);

router.route('/:id/comments')
  .post(protect, addComment);

module.exports = router;
