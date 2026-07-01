const express = require('express');
const router = express.Router();
const { getPages, getPageBySlug, createPage, updatePage, deletePage } = require('../controllers/pageController');
const { protect } = require('../middlewares/auth');

router.route('/')
  .get(getPages)
  .post(protect, createPage);

router.route('/:slug')
  .get(getPageBySlug);

router.route('/:id')
  .put(protect, updatePage)
  .delete(protect, deletePage);

module.exports = router;
