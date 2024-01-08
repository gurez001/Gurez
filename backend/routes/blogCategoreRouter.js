const express = require('express');
const { createBlogCategore, getAllBlogCategores } = require('../controllers/blogCategoreController');
const router = express.Router();


router.route('/blog/create/categore').post(createBlogCategore);
router.route('/blog/all-categore').get(getAllBlogCategores);

module.exports = router;
