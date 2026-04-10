const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a blog title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please provide blog content']
  },
  author: {
    type: String,
    default: 'Kanasu Mushroom Farm'
  },
  category: {
    type: String,
    enum: ['recipe', 'health-benefits', 'growing-guide', 'farm-story', 'tips', 'news'],
    required: true
  },
  featuredImage: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  tags: [String],
  readingTime: {
    type: Number,
    default: 5
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

// Generate slug from title before saving
blogSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
  if (this.published && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  next();
});

// Index for search
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Blog', blogSchema);
