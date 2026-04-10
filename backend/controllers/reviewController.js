const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
exports.getProductReviews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ 
      product: req.params.productId, 
      isActive: true 
    })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ 
      product: req.params.productId, 
      isActive: true 
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    const { product, rating, title, comment, images } = req.body;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ 
      user: req.user.id, 
      product 
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Check if user purchased this product
    const Order = require('../models/Order');
    const userOrders = await Order.find({ 
      user: req.user.id, 
      status: { $in: ['delivered', 'shipped'] } 
    });
    
    let isVerifiedPurchase = false;
    for (const order of userOrders) {
      const hasProduct = order.items.some(item => 
        item.product.toString() === product
      );
      if (hasProduct) {
        isVerifiedPurchase = true;
        break;
      }
    }

    const review = await Review.create({
      user: req.user.id,
      product,
      rating,
      title,
      comment,
      images,
      isVerifiedPurchase
    });

    // Update product rating
    const productDoc = await Product.findById(product);
    const allReviews = await Review.find({ product, isActive: true });
    
    const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    
    productDoc.rating.average = Math.round(averageRating * 10) / 10;
    productDoc.rating.count = allReviews.length;
    productDoc.reviews.push(review._id);
    await productDoc.save();

    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check ownership
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }

    const { rating, title, comment, images } = req.body;
    
    review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, title, comment, images },
      { new: true, runValidators: true }
    );

    // Update product rating
    const product = await Product.findById(review.product);
    const allReviews = await Review.find({ product: review.product, isActive: true });
    const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    
    product.rating.average = Math.round(averageRating * 10) / 10;
    await product.save();

    res.status(200).json({
      success: true,
      review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check ownership or admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    const productId = review.product;
    await review.deleteOne();

    // Update product rating
    const product = await Product.findById(productId);
    const allReviews = await Review.find({ product: productId, isActive: true });
    
    if (allReviews.length > 0) {
      const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      product.rating.average = Math.round(averageRating * 10) / 10;
    } else {
      product.rating.average = 0;
    }
    product.rating.count = allReviews.length;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark review as helpful
// @route   POST /api/reviews/:id/helpful
// @access  Private
exports.markHelpful = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user already marked as helpful
    if (review.helpfulBy.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'You have already marked this review as helpful'
      });
    }

    review.helpful += 1;
    review.helpfulBy.push(req.user.id);
    await review.save();

    res.status(200).json({
      success: true,
      helpful: review.helpful
    });
  } catch (error) {
    next(error);
  }
};
