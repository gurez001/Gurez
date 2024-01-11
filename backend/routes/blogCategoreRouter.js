const express = require("express");
const {
  createBlogCategore,
  getAllBlogCategores,
  deleteBlogCategore,
} = require("../controllers/blogCategoreController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");

router
  .route("/blog/create/categore")
  .post(isAuthenticatedUser, authorizeRols("admin"), createBlogCategore);

router
  .route(`/blog/create/categore/:id`)
  .post(isAuthenticatedUser, authorizeRols("admin"), deleteBlogCategore);
router.route("/blog/all-categore").get(getAllBlogCategores);

module.exports = router;
