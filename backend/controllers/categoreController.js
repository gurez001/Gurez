const catchAsyncError = require("../middleware/catchAsyncError");
const categoreModel = require("../models/categoreModel");
const seoModel = require("../models/seoModel");
const subCategoreModel = require("../models/subCategoreModel");
const ErrorHandler = require("../utils/errorhandler");

exports.createCategore = catchAsyncError(async (req, res, next) => {
  try {
    const {
      name,
      slug,
      title,
      parent,
      description,
      seotitle,
      keyword,
      metadec,
    } = req.body;
    let metalink = slug.split(" ").join("-").toLowerCase();
    const user = req.user.id;

    const existingSlug = await categoreModel.findOne({ slug: metalink });
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
      slug: metalink,
      title,
      description,
      parent,
      user,
    });

    const existingSeoUrl = await seoModel.findOne({ metalink });

    if (existingSeoUrl) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }

    const type = "product cat";
    const seo = await seoModel.create({
      metatitle: seotitle,
      keyword: keyword,
      metadec: metadec,
      metalink: metalink,
      type,
      productcatid: newCategorie._id,
    });

    newCategorie.seo = seo._id;
    await newCategorie.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Categore created successfully",
      //  newCategorie,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

exports.getAllCategores = catchAsyncError(async (req, res, next) => {
  try {
    const allCategores = await categoreModel.find().populate([
      { path: "childs", model: "SubCategore" },
      { path: "user", model: "User" },
      { path: "seo", model: "SEO" },
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
    const {
      name,
      slug,
      title,
      parent,
      description,
      seotitle,
      keyword,
      metadec,
    } = req.body;
    let metalink = slug.split(" ").join("-").toLowerCase();
    const user = req.user.id;

    const existingSlug = await subCategoreModel.findOne({ slug: metalink });

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
      slug: metalink,
      title,
      description,
      parent,
      user,
    });

    const parentCategore = await categoreModel.findById(parent);
    parentCategore.childs.push(newCategorie._id);
    await parentCategore.save({ validateBeforeSave: false });

    const existingSeoUrl = await seoModel.findOne({ metalink });

    if (existingSeoUrl) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }

    const type = "product sub cat";
    const seo = await seoModel.create({
      metatitle: seotitle,
      keyword: keyword,
      metadec: metadec,
      metalink: metalink,
      type,
      productsubcatid: newCategorie._id,
    });

    newCategorie.seo = seo._id;
    await newCategorie.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Categore created successfully",
      newCategorie,
    });
  } catch (err) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

// ----------delete-----------------

exports.StatusCategory = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const isexist = await categoreModel.findById(id);

    if (!isexist) {
      return next(new ErrorHandler("id not found", 400));
    }
    isexist.categorystatus = status;
    await isexist.save({ validateBeforeSave: false });
    res.status(200).json({status:true,
    category:isexist})
  } catch (error) {
    return next(new ErrorHandler(`Internal server error: ${error}`, 500));
  }
});

exports.subStatusCategory = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(req.body)
    const isexist = await subCategoreModel.findById(id);
    if (!isexist) {
      return next(new ErrorHandler("id not found", 400));
    }
    isexist.subcategorystatus = status;
    await isexist.save({ validateBeforeSave: false });
    console.log(isexist)
    res.status(200).json({status:true,
    category:isexist})
  } catch (error) {
    return next(new ErrorHandler(`Internal server error: ${error}`, 500));
  }
});

