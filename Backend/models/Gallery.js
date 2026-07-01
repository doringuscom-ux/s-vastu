const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'small',
  }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
