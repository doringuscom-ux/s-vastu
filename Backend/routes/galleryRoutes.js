const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
router.get('/', async (req, res) => {
  try {
    const gallery = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add a gallery image
// @route   POST /api/gallery
// @access  Private
router.post('/', protect, upload.single('imageFile'), async (req, res) => {
  try {
    const { alt, category, size } = req.body;
    let src = req.body.src; // Fallback if they pass a URL instead of file
    
    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResult) {
        src = cloudinaryResult.url;
      }
    }

    if (!src || !alt || !category) {
      return res.status(400).json({ message: 'Please provide an image, alt text, and category' });
    }

    const newImage = new Gallery({ src, alt, category, size });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update a gallery image
// @route   PUT /api/gallery/:id
// @access  Private
router.put('/:id', protect, upload.single('imageFile'), async (req, res) => {
  try {
    const { alt, category, size } = req.body;
    let src = req.body.src;
    
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResult) {
        src = cloudinaryResult.url;
      }
    }

    image.alt = alt || image.alt;
    image.category = category || image.category;
    image.size = size || image.size;
    image.src = src || image.src;

    const updatedImage = await image.save();
    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    await image.deleteOne();
    res.json({ message: 'Image removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
