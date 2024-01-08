const express = require('express');
const { getAllBlogPost, createBlogPost, updateBlogPost, deleteBlogPost, singleBlogPost } = require('../controllers/blogPostController');
const router = express.Router();

router.route('/blog/all-post').get(getAllBlogPost);
router.route('/blog/add-new-post').post(createBlogPost);
router.route('/blog/update-post/:id').put(updateBlogPost);
router.route('/blog/delete-post/:id').delete(deleteBlogPost);
router.route('/blog/post/:id').get(singleBlogPost);


module.exports = router;