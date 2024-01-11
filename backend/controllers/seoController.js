const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const seoModel = require("../models/seoModel");

exports.createSeo = catchAsyncError(async (req, res, next) => {
  try {
    const { metatitle, keyword, metadec, metalink } = req.body;
    console.log(req.body);
    const seo = await seoModel.create({
      metatitle,
      keyword,
      metadec,
      metalink,
    });

    res.status(201).json({
      success: true,
      seo,
    });
  } catch (error) {
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

    res.status(200).json({
      success: true,
      seo,
    });
  } catch (error) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});
