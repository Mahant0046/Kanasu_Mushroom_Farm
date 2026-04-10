const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscriptionNumber: {
    type: String,
    unique: true,
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    quantity: Number,
    weight: String
  }],
  deliveryFrequency: {
    type: String,
    enum: ['weekly', 'bi-weekly', 'monthly'],
    default: 'weekly'
  },
  deliveryDay: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    default: 'saturday'
  },
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'online'],
    default: 'cod'
  },
  subtotal: {
    type: Number,
    required: true
  },
  shippingFee: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'cancelled', 'completed'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  nextDeliveryDate: Date,
  totalDeliveries: {
    type: Number,
    default: 0
  },
  completedDeliveries: {
    type: Number,
    default: 0
  },
  notes: String
}, {
  timestamps: true
});

// Generate subscription number before saving
subscriptionSchema.pre('save', async function(next) {
  if (!this.subscriptionNumber) {
    const count = await mongoose.model('Subscription').countDocuments();
    this.subscriptionNumber = `SUB${String(count + 1).padStart(6, '0')}`;
  }
  
  // Set next delivery date if not set
  if (!this.nextDeliveryDate && this.status === 'active') {
    const days = {
      'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4,
      'friday': 5, 'saturday': 6, 'sunday': 0
    };
    const today = new Date();
    const targetDay = days[this.deliveryDay];
    const currentDay = today.getDay();
    let daysUntil = targetDay - currentDay;
    if (daysUntil <= 0) daysUntil += 7;
    this.nextDeliveryDate = new Date(today.setDate(today.getDate() + daysUntil));
  }
  next();
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
