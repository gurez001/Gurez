const { createCategore, getAllCategores, createSubCategore, StatusCategory, subStatusCategory, singleParentCategory, updateParentCategore } = require("../controllers/categoreController");
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

  router
  .route("/update/sub-category-status/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), subStatusCategory);

  router
  .route("/product/all-parent-category/:id")
  .get(isAuthenticatedUser, authorizeRols("admin"), singleParentCategory);


  router
  .route("/update/parent-category/:id")
  .put(isAuthenticatedUser, authorizeRols("admin"), updateParentCategore);

  
  
module.exports = router;
