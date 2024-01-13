const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const seoModel = require("../models/seoModel");
const blogPostModel = require("../models/blogPostModel");


exports.createSeo = catchAsyncError(async (req, res, next) => {
  try {
    const { seotitle, keyword, metadec, metalink, type } = req.body;

    const slug = metalink.split(" ").join("-");

    const existingSlug = await seoModel.findOne({ metalink: slug });

    if (existingSlug) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }

    const seo = await seoModel.create({
      metatitle: seotitle,
      keyword,
      metadec,
      metalink: slug,
      type,
    });

    if (type === "post") {
      const blog = await blogPostModel.findOne({ slug:seo.metalink });
      if (!blog) {
        return next(new ErrorHandler(`Blog not found for slug: ${slug}`, 404));
      }
      blog.seo = seo._id;
      await blog.save({ validateBeforeSave: false });
    
    }

    res.status(201).json({
      success: true,
      seo,
    });
  } catch (err) {
   
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

//------------------ update seo;
exports.updateSeo = catchAsyncError(async (req, res, next) => {
  try {
    const { metatitle, keyword, metadec, metalink, id } = req.body;

    console.log(req.body);

    const data = {
      metatitle,
      keyword,
      metadec,
      metalink,
    };

    const seo = await seoModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      seo,
    });
  } catch (error) {
    return next(new ErrorHandler(`Internal server error: ${error}`, 500));
    // Change 'err' to 'error' in the above line
  }
});

//------------------get all seo

exports.getAllSeo = catchAsyncError(async (req, res, next) => {
  try {
    const seo = await seoModel.find();
    const seoReverse = seo.reverse();
    res.status(200).json({
      success: true,
      seo: seoReverse,
    });
  } catch (error) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});
