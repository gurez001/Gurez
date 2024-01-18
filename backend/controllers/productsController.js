const products = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const {
  Types: { ObjectId },
} = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFetures = require("../utils/apiFeatuers");
const CountModel = require("../models/CountModel");
const imageGelleryModel = require("../models/imageGelleryModel");
const generateSitemap = require("../utils/sitemapUtils");
const order = require("../models/orderModels");
const subCategoreModel = require("../models/subCategoreModel");
const categoreModel = require("../models/categoreModel");
const seoModel = require("../models/seoModel");
//------------ Feature Products

exports.featureProduct = catchAsyncError(async (req, res, nex) => {
  try {
    const Orders = await order.find();
    let max = [];

    Orders.forEach((order) => {
      order.orderItem.forEach((item) => {
        max.push(item.productId);
      });
    });

    const productFrequency = max.reduce((acc, productId) => {
      acc[productId] = (acc[productId] || 0) + 1;
      return acc;
    }, {});
    // Convert the object into an array of objects
    const productFrequencyArray = Object.entries(productFrequency).map(
      ([productId, frequency]) => ({ productId, frequency })
    );

    // Sort the array based on frequency in descending order
    const sortedProductFrequencyArray = productFrequencyArray.sort(
      (a, b) => b.frequency - a.frequency
    );

    // let c = sortedProductFrequencyArray[0]
    res.status(200).json({
      success: true,
      product: sortedProductFrequencyArray,
    });
  } catch (err) {
    return next(new ErrorHandler("Internal server error" + error, 500));
  }
});

// create product -- Admin

exports.createProducts = catchAsyncError(async (req, res, next) => {
  try {
    const productCounter = await CountModel.findOne({ entityName: "User" });
    const {
      name,
      slug,
      price,
      maxprice,
      description,
      category,
      article,
      stock,
      imageId,
      seotitle,
      seometadec,
      seokeyword,
      seometalink,
    } = req.body;
    const url = slug.split(" ").join("-");

    const checkSubCat = await subCategoreModel.findById(category);
    const checkCat = await categoreModel.findById(category);
    let catData = [];
    let subCatData = [];
    const user = req.user.id;
    if (checkSubCat) {
      subCatData.push(checkSubCat);
    } else {
      catData.push(checkCat);
    }

    const existing = await products.findOne({ slug });

    if (existing) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }

    const Products = await products.create({
      _id:
        productCounter && productCounter.productCount !== null
          ? productCounter.productCount
          : 1,
      name,
      slug: url,
      price,
      maxprice,
      description,
      article,
      category: subCatData[0] ? subCatData[0].parent : catData[0]._id,
      subcategory: subCatData[0] ? subCatData[0]._id : catData[0]._id,
      stock,
      user,
      imageId,
    });

    const populatedProduct = await products
      .findById(Products._id)
      .lean()
      .exec();

    if (populatedProduct && populatedProduct.imageId) {
      await products.populate(populatedProduct, {
        path: "imageId",
        model: "Images",
      });
      await generateSitemap();
    }

    const existingSeoUrl = await seoModel.findOne({ metalink: slug });

    if (existingSeoUrl) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }

    const type = "product";
    const seo = await seoModel.create({
      metatitle: seotitle,
      keyword: seokeyword,
      metadec: seometadec,
      metalink: slug,
      type,
      productid: Products._id,
    });
console.log(seo)
    Products.seoid = seo._id;
    await Products.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      Products,
    });
  } catch (error) {
    return next(
      new ErrorHandler("Product - Internal Server Error" + error, 500)
    );
  }
});

//----------get all produts
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    const resultPerpage = 12;
    const productCount = await products.countDocuments();
    // const filterProduct = await toggleModel.find();
    const newProducts = [];
    const apiFetures = new ApiFetures(products.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerpage);

    const Products = await apiFetures.query
      .populate([
        { path: "category", model: "Categore" },
        { path: "subcategory", model: "SubCategore" },
        { path: "imageId", model: "Images" },
        { path: "reviewsids", model: "reviewsSchema" },
        { path: "seoid", model: "SEO" },
      ])
      .exec();

    Products.filter((item) => {
      const createDate = new Date(item.createdate);
      const currentDate = new Date();
      const timeDifference = Math.abs(currentDate - createDate);

      // Filter products created within the last 24 hours (86400000 milliseconds in a day)
      let newProduct = timeDifference <= 15 * 24 * 60 * 60 * 1000;
      if (newProduct) {
        newProducts.push(item);
      }
    });

    res.status(200).json({
      success: true,
      Products,
      newProducts,
      productCount,
      resultPerpage,
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        "Error getting all products - Internal Server Error",
        500
      )
    );
  }
});

//----------get all produts --Admin
exports.getAdminAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    let Products = await products
      .find()
      .populate([{ path: "seoid", model: "SEO" }]);
    Products.reverse();
    // if product not found
    if (!Products) {
      // No products found
      return next(new ErrorHandler("No products found", 404));
    }
    // if product found
    res.status(200).json({
      success: true,
      Products,
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        "Error fetching admin products: - Internal Server Error",
        500
      )
    );
  }
});

//------ get single products
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  try {
    console.log( req.params.metalink)
    let Product;
    if (isNaN(req.params.metalink)) {
      Product = await products
        .findOne({
          slug: req.params.metalink,
        })
        .populate([
          { path: "category", model: "Categore" },
          { path: "subcategory", model: "SubCategore" },
          { path: "imageId", model: "Images" },
          { path: "seoid", model: "SEO" },
          {
            path: "reviewsids",
            model: "reviewsSchema",
            populate: {
              path: "user",
              model: "User",
            },
          },
        ]);
    } else {
      Product = await products.findById(req.params.metalink).populate([
        { path: "category", model: "Categore" },
        { path: "subcategory", model: "SubCategore" },
        { path: "imageId", model: "Images" },
        { path: "seoid", model: "SEO" },
        {
          path: "reviewsids",
          model: "reviewsSchema",
          populate: {
            path: "user",
            model: "User",
          },
        },
      ]);
      //  Product = await Product.findById(req.params.metalink).populate('imageId');
    }

    if (!Product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      Product,
    });
  } catch (error) {
    return next(
      new ErrorHandler("Internal Server Error in single product page", 500)
    );
  }
});

// Update produuct -- Admin
exports.updateProducts = catchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const {
      name,
      slug,
      price,
      maxprice,
      description,
      article,
      category,
      stock,
      imageIds,
      seotitle,
      seokeyword,
      seometadec,
      seometalink,
    } = req.body;
    const url = slug.split(" ").join("-");
    const user = req.user.id;

    if (!productId) {
      return next(new ErrorHandler("Product ID is missing", 400));
    }
    let Product = await products.findById(req.params.id);

    if (!Product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const data = {
      name,
      slug: url,
      price,
      maxprice,
      description,
      article,
      parent: category,
      stock,
      user,
      imageId: imageIds,
    };

    const seoData = {
      metatitle: seotitle,
      keyword: seokeyword,
      metadec: seometadec,
      metalink: url,
    };

    Product = await products
      .findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
        overwrite: true, // Replace the entire document with the new data
      })
      .populate("imageId");

    const seo = await seoModel.findOne({ productid: productId });

    if (!seo) {
      return next(new ErrorHandler("product seo not found", 404));
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
      Product,
    });
  } catch (error) {
    return next(new ErrorHandler(" Internal Error updating product:", 404));
  }
});

// Delete product --Admin

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  try {
    let Product = await products.findById(req.params.id);
    const existingProductSeo = await seoModel.findOne({
      productid: Product._id,
    });
    if (!Product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    if (!existingProductSeo) {
      return next(new ErrorHandler("Product seo not found", 404));
    }
    await existingProductSeo.deleteOne();
    await Product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    return next(new ErrorHandler(" Internal Error deleting product:", 500));
  }
});

//---------single product

exports.singleProduct = catchAsyncError(async (req, res, next) => {
  try {
    let Product = await products
      .findById(req.params.id)
      .populate([{ path: "seoid", model: "SEO" }]);
    if (!Product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      Product,
    });
  } catch (error) {
    return next(new ErrorHandler(" Internal Error Product not found:", 500));
  }
});
