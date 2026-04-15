const Blog = require('../models/Blog');

// @desc    Get all published blogs
// @route   GET /api/blog
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};

    // Include inactive blogs for admin
    if (!req.query.includeInactive) {
      query.published = true;
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by ID
// @route   GET /api/blog/:id
// @access  Private/Admin
exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog
// @route   GET /api/blog/:slug
// @access  Public
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog
// @route   POST /api/blog
// @access  Private/Admin
exports.createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /api/blog/:id
// @access  Private/Admin
exports.updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blog categories
// @route   GET /api/blog/categories
// @access  Public
exports.getBlogCategories = async (req, res, next) => {
  try {
    const categories = await Blog.distinct('category', { published: true });

    const categoryLabels = {
      'recipe': 'Recipes',
      'health-benefits': 'Health Benefits',
      'growing-guide': 'Growing Guides',
      'farm-story': 'Farm Stories',
      'tips': 'Tips & Tricks',
      'news': 'News'
    };

    const result = categories.map(cat => ({
      value: cat,
      label: categoryLabels[cat] || cat
    }));

    res.status(200).json({
      success: true,
      categories: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to blog
// @route   POST /api/blog/:id/comments
// @access  Private
exports.addComment = async (req, res, next) => {
  try {
    const { comment } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.comments.push({
      user: req.user.id,
      name: req.user.name,
      comment
    });

    await blog.save();

    res.status(201).json({
      success: true,
      comments: blog.comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured blogs
// @route   GET /api/blog/featured
// @access  Public
exports.getFeaturedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort({ views: -1, publishedAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      blogs
    });
  } catch (error) {
    next(error);
  }
};
