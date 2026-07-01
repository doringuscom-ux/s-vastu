const express = require('express');
const router = express.Router();
const Seo = require('../models/Seo');
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// @desc    Get SEO data for a specific page
// @route   GET /api/seo/:pageName
// @access  Public
router.get('/:pageName', async (req, res) => {
  try {
    const seo = await Seo.findOne({ pageName: req.params.pageName });
    if (seo) {
      res.json(seo);
    } else {
      // If it doesn't exist, return a default object rather than 404 so frontend doesn't crash
      res.json({
        pageName: req.params.pageName,
        title: 'S-Vastu - Best Vastu Consultant',
        description: 'Expert Vastu consulting for home and commercial spaces.',
        keywords: 'Vastu, consultant, astrology',
        ogImage: '',
        scriptTags: ''
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all SEO entries
// @route   GET /api/seo
// @access  Public
router.get('/', async (req, res) => {
  try {
    const seos = await Seo.find({});
    res.json(seos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create or Update SEO data
// @route   PUT /api/seo/:pageName
// @access  Private
router.put('/:pageName', protect, upload.single('ogImageFile'), async (req, res) => {
  try {
    const { title, description, keywords, scriptTags } = req.body;
    let ogImage = req.body.ogImage || '';
    
    if (req.file) {
      const cloudinaryResult = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResult) {
        ogImage = cloudinaryResult.url;
      }
    }

    let seo = await Seo.findOne({ pageName: req.params.pageName });

    if (seo) {
      seo.title = title || seo.title;
      seo.description = description !== undefined ? description : seo.description;
      seo.keywords = keywords !== undefined ? keywords : seo.keywords;
      seo.scriptTags = scriptTags !== undefined ? scriptTags : seo.scriptTags;
      if (ogImage) seo.ogImage = ogImage;
      
      const updatedSeo = await seo.save();
      res.json(updatedSeo);
    } else {
      const newSeo = new Seo({
        pageName: req.params.pageName,
        title,
        description,
        keywords,
        ogImage,
        scriptTags
      });
      const savedSeo = await newSeo.save();
      res.status(201).json(savedSeo);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
