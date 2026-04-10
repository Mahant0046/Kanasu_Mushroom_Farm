const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  comparePrice: {
    type: Number,
    min: 0
  },
  images: [{
    type: String
  }],
  thumbnail: {
    type: String,
    default: ''
  },
  mushroomType: {
    type: String,
    enum: ['button', 'oyster', 'shiitake', 'milky', 'mixed'],
    required: true
  },
  productType: {
    type: String,
    enum: ['fresh', 'dried', 'powder', 'pickle', 'grow-kit', 'other'],
    required: true
  },
  weight: {
    value: Number,
    unit: { type: String, enum: ['g', 'kg', 'pcs'], default: 'g' }
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  },
  nutritionInfo: {
    protein: String,
    calories: String,
    fiber: String,
    vitamins: String
  },
  healthBenefits: [String],
  storageInstructions: String,
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  tags: [String]
}, {
  timestamps: true
});

// Generate slug from name before saving
productSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
  next();
});

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
