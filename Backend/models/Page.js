const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaDescription: {
    type: String,
    default: '',
  },
  metaKeywords: {
    type: String,
    default: '',
  },
  metaCanonical: {
    type: String,
    default: '',
  },
  metaRobots: {
    type: String,
    default: 'index, follow',
  },
  customText: {
    type: String,
    default: '',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Page', pageSchema);
