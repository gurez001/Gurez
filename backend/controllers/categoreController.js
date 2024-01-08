const catchAsyncError = require("../middleware/catchAsyncError");
const categoreModel = require("../models/categoreModel");
const subCategoreModel = require("../models/subCategoreModel");
const ErrorHandler = require("../utils/errorhandler");

exports.createCategore = catchAsyncError(async (req, res, next) => {
  try {
    const { name, slug, title, parent, description } = req.body;
    let metaLink = slug.split(" ").join("-").toLowerCase();
    const user = req.user.id;

    const existingSlug = await categoreModel.findOne({ slug: metaLink });
    if (existingSlug) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          400
        )
      );
    }
    const newCategorie = await categoreModel.create({
      name,
      slug: metaLink,
      title,
      description,
      parent,
      user,
    });
    res.status(201).json({
      success: true,
      message: "Categore created successfully",
      newCategorie,
    });
  } catch (err) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

exports.getAllCategores = catchAsyncError(async (req, res, next) => {
  try {
    const allCategores = await categoreModel.find().populate([
      { path: "childs", model: "SubCategore" },
      { path: "user", model: "User" },
    ]);
    if (allCategores.length < 1) {
      return next(new ErrorHandler());
    }
    res.status(200).json({
      success: true,
      allCategores,
    });
  } catch (err) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

//---------------------------- sub cat

exports.createSubCategore = catchAsyncError(async (req, res, next) => {
  try {
    const { name, slug, title, parent, description } = req.body;
    let metaLink = slug.split(" ").join("-").toLowerCase();
    const user = req.user.id;

    const existingSlug = await subCategoreModel.findOne({ slug: metaLink });

    if (existingSlug) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          400
        )
      );
    }
    const newCategorie = await subCategoreModel.create({
      name,
      slug: metaLink,
      title,
      description,
      parent,
      user,
    });

    const parentCategore = await categoreModel.findById(parent);
    parentCategore.childs.push(newCategorie._id);
    await parentCategore.save({ validateBeforeSave: false });
    res.status(201).json({
      success: true,
      message: "Categore created successfully",
      newCategorie,
    });
  } catch (err) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});
