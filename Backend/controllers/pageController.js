const Page = require('../models/Page');

// Get all pages
const getPages = async (req, res) => {
  try {
    const pages = await Page.find({}).sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get page by slug
const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new page
const createPage = async (req, res) => {
  try {
    const { title, slug, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots, customText } = req.body;

    const pageExists = await Page.findOne({ slug });
    if (pageExists) {
      return res.status(400).json({ message: 'Page with this slug already exists' });
    }

    const page = new Page({
      title, slug, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots, customText
    });

    const createdPage = await page.save();
    res.status(201).json(createdPage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a page
const updatePage = async (req, res) => {
  try {
    const { title, slug, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots, customText } = req.body;
    const page = await Page.findById(req.params.id);

    if (page) {
      page.title = title || page.title;
      page.slug = slug || page.slug;
      page.metaTitle = metaTitle || page.metaTitle;
      page.metaDescription = metaDescription || page.metaDescription;
      page.metaKeywords = metaKeywords || page.metaKeywords;
      page.metaCanonical = metaCanonical || page.metaCanonical;
      page.metaRobots = metaRobots || page.metaRobots;
      page.customText = customText || page.customText;

      const updatedPage = await page.save();
      res.json(updatedPage);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a page
const deletePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (page) {
      await page.deleteOne();
      res.json({ message: 'Page removed' });
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getPages, getPageBySlug, createPage, updatePage, deletePage };
