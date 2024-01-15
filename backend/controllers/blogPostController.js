const catchAsyncError = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");
const CountModel = require("../models/CountModel");
const blogPost = require("../models/blogPostModel");
const ErrorHandler = require("../utils/errorhandler");
const seoModel = require("../models/seoModel");

//-------------- get all post
exports.getAllBlogPost = catchAsyncError(async (req, res, next) => {
  try {
    const blog = await blogPost.find().populate([
      { path: "category", model: "blogCategore" },
      { path: "user", model: "User" },
      { path: "seo", model: "SEO" },
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
    const {
      title,
      description,
      slug,
      category,
      seotitle,
      keyword,
      metadec,
      metalink,
    } = req.body;
   
    const url = slug.split(" ").join("-").toLowerCase();
    const user = req.user._id;

    const existingSlug = await blogPost.findOne({ slug: url });

    if (existingSlug) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }

    const blog = await blogPost.create({
      postid:
        bloggCounter && bloggCounter.blogpost !== null
          ? bloggCounter.blogpost
          : 1,
      title,
      article: description,
      category,
      slug: url,
      user,
    });

    const existingSeoUrl = await seoModel.findOne({ metalink: url });

    if (existingSeoUrl) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }
    const type = "post";
    const seo = await seoModel.create({
      metatitle: seotitle,
      keyword,
      metadec,
      metalink: slug,
      type,
      blogid: blog._id,
    });

    blog.seo = seo._id;
    await blog.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      blog,
      seo,
    });
  } catch (error) {
    return next(new ErrorHandler("Post - Internal Server Error" + error, 500));
  }
});

//--------------------- update post -- admin

exports.updateBlogPost = catchAsyncError(async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      slug,
      seotitle,
      keyword,
      metadec,
      metalink,
    } = req.body;
    const { id } = req.params;
    const url = slug.split(" ").join("-").toLowerCase();
    const data = {
      title,
      article: description,
      slug: url,
      category: category,
    };
    const seoData = {
      metatitle: seotitle,
      keyword: keyword,
      metadec: metadec,
      metalink: metalink,
    };

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return next(new ErrorHandler("Invalid ID format", 400));
    // }

    const existingPost = await blogPost.findOne({ postid: id });

    if (!existingPost) {
      return next(new ErrorHandler("Post not found", 404));
    }

    const updatedPost = await blogPost.findByIdAndUpdate(
      existingPost._id,
      data,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const seo = await seoModel.findById(existingPost.seo);

    if (!seo) {
      return next(new ErrorHandler("Post not found", 404));
    }

    const updatedPostSeo = await seoModel.findOneAndUpdate(
      { _id: seo._id },
      seoData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      blog: updatedPost,
      seo: updatedPostSeo,
    });
  } catch (error) {
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
    const existingPostSeo = await seoModel.findOne({ _id:existingPost.seo });
    
    if (!existingPost) {
      return next(new ErrorHandler("Post not found", 404));
    }
    if (!existingPostSeo) {
      return next(new ErrorHandler("Post not found", 404));
    }

    await existingPostSeo.deleteOne();
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

    let blog;
    if (isNaN(req.params.id)) {
      blog = await blogPost.findOne({ slug: id }).populate([
        { path: "category", model: "blogCategore" },
        { path: "user", model: "User" },
        { path: "seo", model: "SEO" },
      ]);
    } else {
      blog = await blogPost.findOne({ postid: id }).populate([
        { path: "category", model: "blogCategore" },
        { path: "user", model: "User" },
        { path: "seo", model: "SEO" },
      ]);
      //  Product = await Product.findById(req.params.metalink).populate('imageId');
    }

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return next(new ErrorHandler("Invalid ID format", 400));
    // }

    if (!blog) {
      return next(new ErrorHandler("Post not found", 404));
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Post - Internal Server Error", 500));
  }
});
