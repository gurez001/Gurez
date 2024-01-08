import { createStore, combineReducers, applyMiddleware,compose } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  CatReducer,
  adminProductreducer,
  createProductReducer,
  featureProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productSearchReducer,
  productsReviewReducer,
  reviewsReducer,
} from "./reducers/ProductReducer";
import {
  adminProfileReducer,
  allUserReducer,
  forgetPasswordReducer,
  otpReducer,
  otpResendReducer,
  profileReducer,
  resetPasswordReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/UserReducer";
import { cartReducer } from "./reducers/CartReducer";
import {
  AllOredersReducer,
  OredersReducer,
  myOredersReducer,
  newOrederReducer,
  orderDetailsReducer,
} from "./reducers/OrderReducer";
import { paymentDataReducer, paymentReducer } from "./reducers/PaymentReducer";
import {
  getAllImageReducer,
  imageTextUpdateReducer,
  imageUpdateReducer,
  imageUploadReducer,
  selectImageeReducer,
} from "./reducers/imageGelleryReducer";
import { WishListReducer } from "./reducers/WiahListReducer";
import { getAllCategoriesReducer, newCategoreReducer } from "./reducers/CategorieReducer";
import { BlogPostReducer, SingleBlogPageReducer } from "./reducers/BlogPostReducer";
import { BlogCategoryReducer } from "./reducers/BlogCategoryReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  catProducts: CatReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  newOrder: newOrederReducer,
  myOrders: myOredersReducer,
  orderDetails: orderDetailsReducer,
  review: newReviewReducer,
  newProduct: createProductReducer,
  adminProduct: adminProductreducer,
  allOrders: AllOredersReducer,
  adminOrders: OredersReducer,
  adminUsers: allUserReducer,
  adminUserDetails: userDetailsReducer,
  adminProfile: adminProfileReducer,
  productReviews: productsReviewReducer,
  contReview: reviewsReducer,
  search: productSearchReducer,
  payment: paymentReducer,
  images: getAllImageReducer,
  otp: otpReducer,
  payData: paymentDataReducer,
  resendOtp: otpResendReducer,
  uploadImage: imageUploadReducer,
  updateImage: imageUpdateReducer,
  updateImageText: imageTextUpdateReducer,
  selectedImages: selectImageeReducer,
  forgetPassword: forgetPasswordReducer,
  resetPassword: resetPasswordReducer,
  wishList: WishListReducer,
  productFeature: featureProductReducer,
  adminCategore:newCategoreReducer,
  allCategroe:getAllCategoriesReducer,
  allBlog:BlogPostReducer,
  allBlogCategory:SingleBlogPageReducer,
});
let inialState = {
  cart: {
    cartItem: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippinginfo: localStorage.getItem("shippinginfo")
      ? JSON.parse(localStorage.getItem("shippinginfo"))
      : {},
  },

  wishList: {
    wishL: localStorage.getItem("wishListItems")
      ? JSON.parse(localStorage.getItem("wishListItems"))
      : [],
  },

  // wish: {
  //   cartItem: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippingInfo: localStorage.getItem("shippinginfo")
  //     ? JSON.parse(localStorage.getItem("shippinginfo"))
  //     : {},
  // },
};

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  inialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
