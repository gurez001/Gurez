const express = require("express");
const router = express.Router();

const {
  getAllSeo,
  // createSeo,
  // updateSeo,
} = require("../controllers/seoController");

router.route("/all-seo").get(getAllSeo);
// router.route("/create/seo").post(createSeo);
// router.route("/update/seo").put(updateSeo);

module.exports = router;
