const fs = require('fs');
const path = require('path');
const Page = require('../models/Page');
const Blog = require('../models/Blog');
const Seo = require('../models/Seo');

const injectSEO = async (req, res, next) => {
  try {
    const indexPath = path.join(__dirname, '../../S-Vastu/dist/index.html');
    
    // Check if index.html exists (only in production)
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send('Frontend build not found. Please run npm run build in frontend.');
    }

    let htmlData = fs.readFileSync(indexPath, 'utf8');

    let metaTitle = 'S Vastu Solution - Expert Vastu Consultant';
    let metaDescription = 'Trusted Vastu Consultant in Zirakpur, Chandigarh. Expert in Residential, Commercial, and Industrial Vastu.';
    let metaKeywords = 'Vastu Consultant, S Vastu Solution, Chandigarh, Zirakpur, Numerology, Residential Vastu';
    let metaCanonical = 'https://svastusolution.com' + req.path;
    let metaRobots = 'index, follow';
    let metaOgImage = '';
    let scriptTags = '';

    const routePath = req.path;
    const parts = routePath.split('/').filter(Boolean);

    // Dynamic Route Resolution
    if (parts.length === 0) {
      // Home Page
      const seoData = await Seo.findOne({ pageName: 'home' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      }
    } else if (parts[0] === 'about-us') {
      const seoData = await Seo.findOne({ pageName: 'about' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      }
    } else if (parts[0] === 'services') {
      const seoData = await Seo.findOne({ pageName: 'services' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      }
    } else if (parts[0] === 'gallery') {
      const seoData = await Seo.findOne({ pageName: 'gallery' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      }
    } else if (parts[0] === 'contact') {
      const seoData = await Seo.findOne({ pageName: 'contact' });
      if (seoData) {
        metaTitle = seoData.title || metaTitle;
        metaDescription = seoData.description || metaDescription;
        metaKeywords = seoData.keywords || metaKeywords;
        metaCanonical = seoData.canonical || metaCanonical;
        metaRobots = seoData.robots || metaRobots;
        metaOgImage = seoData.ogImage || metaOgImage;
        scriptTags = seoData.scriptTags || scriptTags;
      }
    } else if (parts[0] === 'blog' && parts.length === 2) {
      // Single Blog Page
      const blogData = await Blog.findOne({ slug: parts[1] });
      if (blogData) {
        metaTitle = blogData.metaTitle || blogData.title;
        metaDescription = blogData.metaDescription || '';
        metaKeywords = blogData.metaKeywords || '';
        metaCanonical = blogData.metaCanonical || metaCanonical;
        metaRobots = blogData.metaRobots || metaRobots;
        metaOgImage = blogData.image || metaOgImage;
      }
    } else if (parts.length === 1) {
      // City Pages or Single Service Pages
      const pageData = await Page.findOne({ slug: parts[0] });
      if (pageData) {
        const formattedCity = parts[0].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        metaTitle = pageData.metaTitle || `Best Vastu Consultant & Astrologer in ${formattedCity} | S-Vastu`;
        metaDescription = pageData.metaDescription || `Looking for expert Vastu and Astrology services in ${formattedCity}? S-Vastu offers personalized consultations for home, business, and numerology.`;
        metaKeywords = pageData.metaKeywords || `vastu consultant ${formattedCity}, best astrologer ${formattedCity}, numerology ${formattedCity}`;
        metaCanonical = pageData.metaCanonical || metaCanonical;
        metaRobots = pageData.metaRobots || metaRobots;
      }
    }

    // Inject data into HTML
    htmlData = htmlData.replace(/<title data-rh="true">S-Vastu Solution<\/title>/g, `<title data-rh="true">${metaTitle}</title>`);
    htmlData = htmlData.replace(/<meta data-rh="true" name="description" content="S-Vastu Description" \/>/g, `<meta data-rh="true" name="description" content="${metaDescription}" />`);
    htmlData = htmlData.replace(/<meta data-rh="true" name="keywords" content="S-Vastu Keywords" \/>/g, `<meta data-rh="true" name="keywords" content="${metaKeywords}" />`);
    htmlData = htmlData.replace(/<link data-rh="true" rel="canonical" href="https:\/\/svastusolution\.com" \/>/g, `<link data-rh="true" rel="canonical" href="${metaCanonical}" />`);
    htmlData = htmlData.replace(/<meta data-rh="true" name="robots" content="index, follow" \/>/g, `<meta data-rh="true" name="robots" content="${metaRobots}" />`);
    htmlData = htmlData.replace(/<meta data-rh="true" property="og:title" content="S-Vastu Solution" \/>/g, `<meta data-rh="true" property="og:title" content="${metaTitle}" />`);
    htmlData = htmlData.replace(/<meta data-rh="true" property="og:description" content="S-Vastu Description" \/>/g, `<meta data-rh="true" property="og:description" content="${metaDescription}" />`);
    htmlData = htmlData.replace(/<meta data-rh="true" property="og:image" content="" \/>/g, `<meta data-rh="true" property="og:image" content="${metaOgImage}" />`);
    htmlData = htmlData.replace(/<!-- S-VASTU-SCRIPTS -->/g, scriptTags || '');

    return res.send(htmlData);
  } catch (error) {
    console.error('Error injecting SEO:', error);
    next(error);
  }
};

module.exports = injectSEO;
