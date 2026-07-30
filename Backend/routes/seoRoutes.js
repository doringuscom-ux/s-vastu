const express = require('express');
const router = express.Router();
const Seo = require('../models/Seo');
const Page = require('../models/Page');
const Blog = require('../models/Blog');
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// @desc    Get SEO metadata by path for PHP injection
// @route   GET /api/seo/metadata
// @access  Public
router.get('/metadata', async (req, res) => {
  try {
    const routePath = req.query.path || '/';
    const parts = routePath.split('/').filter(Boolean);

    let seoResponse = {};

    if (parts.length === 0) {
      const data = await Seo.findOne({ pageName: 'home' });
      if (data) seoResponse = data;
    } else if (['about-us', 'services', 'gallery', 'contact'].includes(parts[0])) {
      const pageMap = {
        'about-us': 'about',
        'services': 'services',
        'gallery': 'gallery',
        'contact': 'contact'
      };
      const data = await Seo.findOne({ pageName: pageMap[parts[0]] });
      if (data) seoResponse = data;
    } else if (parts[0] === 'blog' && parts.length === 2) {
      const blogData = await Blog.findOne({ slug: parts[1] });
      if (blogData) {
        seoResponse = {
          title: blogData.metaTitle || blogData.title,
          description: blogData.metaDescription || '',
          keywords: blogData.metaKeywords || '',
          canonical: blogData.metaCanonical || '',
          robots: blogData.metaRobots || '',
          ogImage: blogData.image || ''
        };
      }
    } else if (parts.length === 1) {
      const pageData = await Page.findOne({ slug: parts[0] });
      if (pageData) {
        const formattedCity = parts[0].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        seoResponse = {
          title: pageData.metaTitle || `Best Vastu Consultant & Astrologer in ${formattedCity} | S-Vastu`,
          description: pageData.metaDescription || `Looking for expert Vastu and Astrology services in ${formattedCity}? S-Vastu offers personalized consultations for home, business, and numerology.`,
          keywords: pageData.metaKeywords || `vastu consultant ${formattedCity}, best astrologer ${formattedCity}, numerology ${formattedCity}`,
          canonical: pageData.metaCanonical || '',
          robots: pageData.metaRobots || ''
        };
      }
    }

    res.json(seoResponse);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get SEO details for a specific page
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
        scriptTags: '',
        canonical: '',
        robots: 'index, follow'
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
    const { title, description, keywords, scriptTags, canonical, robots } = req.body;
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
      seo.canonical = canonical !== undefined ? canonical : seo.canonical;
      seo.robots = robots !== undefined ? robots : seo.robots;
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
        scriptTags,
        canonical,
        robots
      });
      const savedSeo = await newSeo.save();
      res.status(201).json(savedSeo);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
