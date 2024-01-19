const mongoose = require("mongoose");
const CountModel = require("./CountModel");
const Images = require("./imageGelleryModel");

const productSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  article: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  maxprice: {
    type: Number,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  imageId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Images" }],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categore",
    required: [true, "Please enter product category"],
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategore",
    required: [true, "Please enter product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  seoid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SEO",
  },
  productstatus: {
    type: Boolean,
    default:true
  },
  reviewsids: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviewsSchema" }],

  user: {
    type: Number,
    ref: "User",
    required: true,
  },
  createdate: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    // const Counter = mongoose.model('Counter');
    const counter = await CountModel.findOneAndUpdate(
      { entityName: "User" }, // Use a unique name for each entity
      { $inc: { productCount: 1 } },
      { new: true, upsert: true }
    );

    this._id = counter.productCount;

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Product", productSchema);
