// const products = require("../models/productModels");
const reviewsSchema = require("../models/reviewsModel");
const ErrorHandler = require("../utils/errorhandler");
const {
  Types: { ObjectId },
} = require("mongoose");

const catchAsyncError = require("../middleware/catchAsyncError");
const CountModel = require("../models/CountModel");
const productModels = require("../models/productModels");

//--------create new review and update the reviews

exports.createProductReviews = catchAsyncError(async (req, res, next) => {
  try {
    const { rating, comment, productId, imageid, user } = req.body;

    const reviews = {
      user,
      imageid,
      rating,
      productid: productId,
      comment,
    };

    let isExistReview = await reviewsSchema.findOne({
      productid: productId,
      user,
    });

    if (isExistReview) {
      isExistReview.rating = rating;
      isExistReview.comment = comment;
      await isExistReview.save();

      const product = await productModels.findById(productId);

      // Assuming 'reviewsids' is an array field in your 'productModels' schema
      product.reviewsids.push(isExistReview._id);
      await product.save();

      res.status(200).json({
        message: "Review updated successfully",
        isExistReview,
      });
    } else {
      const newReview = await reviewsSchema.create(reviews);
      // const totalReviewsCount = await isExistReview.countDocuments();
      // await reviewsSchema.findByIdAndUpdate(productid, {
      //   numOfReviews: totalReviewsCount,
      // });
      res
        .status(201)
        .json({ message: "Review created successfully", newReview });
    }

    // Assuming there's a 'Product' schema with a 'totalReviews' field
    // await Product.findOneAndUpdate(
    //   { _id: productid },
    //   { totalReviews: totalReviewsCount }
    // );
  } catch (error) {
    return next(
      new ErrorHandler(`product review internal server error: ${error}`, 500)
    );
  }
});

//--------get All reviews

exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  try {
    //   const Product = await products.findById(req.query.id);
    const productReview = await reviewsSchema.find().populate([
      { path: "user", model: "user" },
      
    ]);

    if (!productReview) {
      return next(new ErrorHandler("Product review not found", 404));
    }
    res.status(200).json({
      success: true,
      productReview,
    });
  } catch (error) {
    return next(new ErrorHandler("Product review internal server error:", 500));
  }
});

// //--------Delete reviews

// exports.DeleteProductReviews = catchAsyncError(async (req, res, next) => {
//   try {
//     let Product = await products.findById(req.query.productId);
//     if (!Product) {
//       return next(new ErrorHandler("Product not found", 404));
//     }
//     const reviews = Product.reviews.filter((rev) => {
//       return rev._id.toString() !== req.query.id.toString();
//     });

//     let review_avg = 0;

//     reviews.forEach((rev) => {
//       review_avg += rev.rating;
//     });

//     const ratings = reviews.length > 0 ? review_avg / reviews.length : 0; // Check if reviews array is empty

//     const numOfReviews = reviews.length;

//     await products.findByIdAndUpdate(
//       req.query.productId,
//       {
//         reviews,
//         ratings,
//         numOfReviews,
//       },
//       {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       reviews: reviews,
//       message: "Review removed",
//     });
//   } catch (error) {
//     return next(new ErrorHandler(" Internal Error prodduct not delete", 500));
//   }
// });
