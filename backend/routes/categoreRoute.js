const { createCategore, getAllCategores, createSubCategore, StatusCategory } = require("../controllers/categoreController");
const { authorizeRols, isAuthenticatedUser } = require("../middleware/auth");

const express = require("express");

const router = express.Router();

router
  .route("/create/categore")
  .post(isAuthenticatedUser, authorizeRols("admin"), createCategore);

  router
  .route("/all-categore")
  .get(getAllCategores);


  //--------------- sub cat
  router
  .route("/create/sub-categore")
  .post(isAuthenticatedUser, authorizeRols("admin"), createSubCategore);

  router
  .route("/update/category-status/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), StatusCategory);

module.exports = router;
