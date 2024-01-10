const catchAsyncError = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");
const CountModel = require("../models/CountModel");
const blogPost = require("../models/blogPostModel");
const ErrorHandler = require("../utils/errorhandler");

//-------------- get all post
exports.getAllBlogPost = catchAsyncError(async (req, res, next) => {
  try {
    const blog = await blogPost.find().populate([
      { path: "category", model: "blogCategore" },
      { path: "user", model: "User" },
    ]);

    const reverseBlog = blog.reverse();
    res.status(200).json({
      success: true,
      blog: reverseBlog,
    });
  } catch (err) {
    console.log(err);
  }
});
//------ create blog post -- admin

exports.createBlogPost = catchAsyncError(async (req, res, next) => {
  try {
    const bloggCounter = await CountModel.findOne({ entityName: "User" });
    const { title, article, slug, category } = req.body;

    const url = slug.split(" ").join("-").toLowerCase();
    const user = req.user._id;

    const blog = await blogPost.create({
      postid:
        bloggCounter && bloggCounter.blogpost !== null
          ? bloggCounter.blogpost
          : 1,
      title,
      article,
      category,
      slug: url,
      user,
    });
    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Post - Internal Server Error" + error, 500));
  }
});

//--------------------- update post -- admin

exports.updateBlogPost = catchAsyncError(async (req, res, next) => {
  try {
    const { title, article, slug } = req.body;
    const { id } = req.params;

    const data = {
      title,
      article,
      slug,
    };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid ID format", 400));
    }

    const existingPost = await blogPost.findById(id);

    if (!existingPost) {
      return next(new ErrorHandler("Post not found", 404));
    }

    const updatedPost = await blogPost.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      blog: updatedPost,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Post - Internal Server Error", 500));
  }
});

//----------------------- delete post -- admin

exports.deleteBlogPost = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return next(new ErrorHandler("Invalid ID format", 400));
    // }

    const existingPost = await blogPost.findOne({ postid: id });

    if (!existingPost) {
      return next(new ErrorHandler("Post not found", 404));
    }

    await existingPost.deleteOne();
    res.status(200).json({
      success: true,
      message: "post has been deleted",
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Post - Internal Server Error", 500));
  }
});

//------------- get single post

exports.singleBlogPost = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return next(new ErrorHandler("Invalid ID format", 400));
    // }

    const existingPost = await blogPost.findOne({ slug: id });

    if (!existingPost) {
      return next(new ErrorHandler("Post not found", 404));
    }

    const blog = await blogPost.findOne({ slug: id });

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Post - Internal Server Error", 500));
  }
});
