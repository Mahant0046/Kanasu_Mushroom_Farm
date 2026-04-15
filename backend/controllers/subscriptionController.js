const Subscription = require('../models/Subscription');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create subscription
// @route   POST /api/subscriptions
// @access  Private
exports.createSubscription = async (req, res, next) => {
  try {
    const { items, deliveryFrequency, deliveryDay, shippingAddress, paymentMethod, notes } = req.body;

    // Validate shipping address
    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required'
      });
    }

    const requiredAddressFields = ['name', 'phone', 'street', 'city', 'state', 'zipCode'];
    for (const field of requiredAddressFields) {
      if (!shippingAddress[field] || shippingAddress[field].trim() === '') {
        return res.status(400).json({
          success: false,
          message: `Shipping address ${field} is required`
        });
      }
    }

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No subscription items'
      });
    }

    // Calculate totals
    let subtotal = 0;
    const subscriptionItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      subscriptionItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        weight: product.weight ? `${product.weight.value}${product.weight.unit}` : ''
      });
    }

    // Calculate shipping fee (free for subscriptions above 300)
    const shippingFee = subtotal >= 300 ? 0 : 40;
    const total = subtotal + shippingFee;

    // Create subscription
    const subscription = await Subscription.create({
      user: req.user.id,
      items: subscriptionItems,
      deliveryFrequency,
      deliveryDay,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      total,
      notes
    });

    res.status(201).json({
      success: true,
      subscription
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user subscriptions
// @route   GET /api/subscriptions
// @access  Private
exports.getUserSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name images');

    res.status(200).json({
      success: true,
      subscriptions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single subscription
// @route   GET /api/subscriptions/:id
// @access  Private
exports.getSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate('items.product', 'name images');

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Check ownership
    if (subscription.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this subscription'
      });
    }

    res.status(200).json({
      success: true,
      subscription
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update subscription
// @route   PUT /api/subscriptions/:id
// @access  Private
exports.updateSubscription = async (req, res, next) => {
  try {
    let subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Check ownership (or admin)
    if (subscription.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this subscription'
      });
    }

    // Can only update active subscriptions
    if (subscription.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Can only update active subscriptions'
      });
    }

    const { deliveryFrequency, deliveryDay, shippingAddress, items } = req.body;

    // Recalculate totals if items changed
    if (items) {
      let subtotal = 0;
      const subscriptionItems = [];

      for (const item of items) {
        const product = await Product.findById(item.product);
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        subscriptionItems.push({
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          weight: product.weight ? `${product.weight.value}${product.weight.unit}` : ''
        });
      }

      subscription.items = subscriptionItems;
      subscription.subtotal = subtotal;
      subscription.shippingFee = subtotal >= 300 ? 0 : 40;
      subscription.total = subscription.subtotal + subscription.shippingFee;
    }

    if (deliveryFrequency) subscription.deliveryFrequency = deliveryFrequency;
    if (deliveryDay) subscription.deliveryDay = deliveryDay;
    if (shippingAddress) subscription.shippingAddress = shippingAddress;

    await subscription.save();

    res.status(200).json({
      success: true,
      subscription
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Pause subscription
// @route   PUT /api/subscriptions/:id/pause
// @access  Private
exports.pauseSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Check ownership (or admin)
    if (subscription.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to pause this subscription'
      });
    }

    if (subscription.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Can only pause active subscriptions'
      });
    }

    subscription.status = 'paused';
    await subscription.save();

    res.status(200).json({
      success: true,
      subscription
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Resume subscription
// @route   PUT /api/subscriptions/:id/resume
// @access  Private
exports.resumeSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Check ownership (or admin)
    if (subscription.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to resume this subscription'
      });
    }

    if (subscription.status !== 'paused') {
      return res.status(400).json({
        success: false,
        message: 'Can only resume paused subscriptions'
      });
    }

    subscription.status = 'active';
    
    // Recalculate next delivery date
    const days = {
      'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4,
      'friday': 5, 'saturday': 6, 'sunday': 0
    };
    const today = new Date();
    const targetDay = days[subscription.deliveryDay];
    const currentDay = today.getDay();
    let daysUntil = targetDay - currentDay;
    if (daysUntil <= 0) daysUntil += 7;
    subscription.nextDeliveryDate = new Date(today.setDate(today.getDate() + daysUntil));
    
    await subscription.save();

    res.status(200).json({
      success: true,
      subscription
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel subscription
// @route   PUT /api/subscriptions/:id/cancel
// @access  Private
exports.cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Check ownership (or admin)
    if (subscription.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this subscription'
      });
    }

    if (subscription.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Subscription is already cancelled'
      });
    }

    subscription.status = 'cancelled';
    subscription.endDate = Date.now();
    await subscription.save();

    res.status(200).json({
      success: true,
      subscription
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all subscriptions (Admin)
// @route   GET /api/subscriptions/all
// @access  Private/Admin
exports.getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone')
      .populate('items.product', 'name');

    res.status(200).json({
      success: true,
      subscriptions
    });
  } catch (error) {
    next(error);
  }
};
