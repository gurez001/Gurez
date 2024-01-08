const catchAsyncError = require("../middleware/catchAsyncError");
const blogCategoreModel = require("../models/blogCategoreModel");

const ErrorHandler = require("../utils/errorhandler");

exports.createBlogCategore = catchAsyncError(async (req, res, next) => {
  try {
    
    const { name, slug, title, description } = req.body;
    let metaLink = slug.split(" ").join("-").toLowerCase();
    // const user = req.user.id;
    // const user = 1;
    const existingSlug = await blogCategoreModel.findOne({ slug: metaLink });

    if (!existingSlug) {
      const newCategorie = await blogCategoreModel.create({
        name,
        slug: metaLink,
        title,
        description,
        // user,
      });
      res.status(201).json({
        success: true,
        message: "Categore created successfully",
        newCategorie,
      });
    } else {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }
  } catch (err) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

exports.getAllBlogCategores = catchAsyncError(async (req, res, next) => {
  try {
    const allCategores = await blogCategoreModel
      .find()
    //   .populate([{ path: "user", model: "User" }]);
    res.status(200).json({
      success: true,
      allCategores,
    });
  } catch (err) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});
