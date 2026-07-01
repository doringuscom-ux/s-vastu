const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Page = require('../models/Page');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).select('slug updatedAt');
    const pages = await Page.find().select('slug updatedAt');
    
    const baseUrl = process.env.FRONTEND_URL || 'https://svastusolution.com';
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Default static routes
    const defaultRoutes = ['/', '/about', '/contact', '/services', '/gallery', '/blogs', '/locations'];
    defaultRoutes.forEach(route => {
      xml += `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    
    // Dynamic Pages
    pages.forEach(page => {
      xml += `  <url>\n    <loc>${baseUrl}/${page.slug}</loc>\n    <lastmod>${new Date(page.updatedAt || Date.now()).toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });
    
    // Dynamic Blogs
    blogs.forEach(blog => {
      xml += `  <url>\n    <loc>${baseUrl}/blog/${blog.slug}</loc>\n    <lastmod>${new Date(blog.updatedAt || Date.now()).toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });
    
    xml += '</urlset>';
    
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
