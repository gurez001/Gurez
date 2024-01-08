import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa6";
import { ClearError, getProductDetails } from "../../actions/ProductAction";
import {
  reviewsClearError,
  //getProductDetails,
  newReview,
  createReview,
} from "../../actions/ReviewsAction";
import Loader from "../layout/loader/Loader";
import SingleProductRight from "./assets/SingleProductRight";
import SingleProductLeft from "./assets/SingleProductLeft";
import { FaMinus, FaPlus, FaOpencart, FaAngellist } from "react-icons/fa6";
import ReviewCard from "../productDetails/assets/ReviewCard";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import "./style/style.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstants";
import { ReviewStar } from "./assets/ReviewStar";
import ProductSlider from "./assets/ProductSlider";
import MetaData from "../layout/metaData/MetaData";
import LazyLoadImages from "../layout/lazyload/LazyLoadImages";
import { wishListAction } from "../../actions/wishListAction";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  //--------------- useSelector ----------------------------
  const { loding, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reverror } = useSelector((state) => state.review);
  const { user } = useSelector((state) => state.user);

  //--------------- useSelector ----------------------------

  //-------------------- use state------------------------
  const [showContent, setShowContent] = useState(true);
  const [quentity, setQuentity] = useState(1);
  const [pageLoaad, setPageLoad] = useState(true);
  const [productId, setProductId] = useState("");
  //-------------------- use state------------------------

  //-----increase quentity
  const increaseQuantity = () => {
    if (product.stock <= quentity) return;
    const quty = quentity + 1;
    setQuentity(quty);
  };
  //-----decrease quentity
  const decreaseQuantity = () => {
    if (1 >= quentity) return;
    const quty = quentity - 1;
    setQuentity(quty);
  };
  //---add to cart item
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quentity));
    alert.success("Item Added to Cart");
  };
  //-------add to wishlist item

  const addToWishtHandler = () => {
    dispatch(wishListAction(id));
    alert.success("Item Added to Wishlist");
  };

  //--------buy handler
  const buyHandler = () => {
    dispatch(addItemsToCart(id, quentity));
    Navigate("/cart");
  };

  // --------------------this is for ratings-------------------

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    // const myForm = new FormData();
    // myForm.set("rating", rating);
    // myForm.set("comment", );
    // myForm.set("productId", productId);
    dispatch(createReview(rating, comment, productId,user && user._id));

    setOpen(false);
  };

  // --------------------this is for ratings End-------------------
  // const isPrimary = product && product.images.map((item) => {
  //   return item.url.findIndex((img,i) => {if(img.primary === true) return i});
  // });

  // const [imgIndex, setImgIndex] = useState(Number(isPrimary??0));
  const [imgIndex, setImgIndex] = useState(0);

  const imgSlideFun = (i) => {
    setImgIndex(i);
  };
  useMemo(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, []);
  useEffect(() => {
    setProductId(product && product._id);
    if (error) {
      alert.error(error);
      dispatch(ClearError());
      Navigate("/404");
    }
    if (reverror) {
      alert.error(reverror);
      dispatch(reviewsClearError());
    }
    if (success) {
      alert.success("Review add successfully submited");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    if (!loding) {
      const delay = setTimeout(() => {
        setPageLoad(false); // Set loading state to false after the delay
        clearTimeout(delay); // Clear the timeout
      }, 200);
    }
    // if (product && product.seo && id !== String(product.seo[0]?.metalink)) {
    //  Navigate('/404')
    // }
  }, [dispatch, error, alert, reverror, success, pageLoaad, loding]);

  const date = new Date(String(product?.createdate).substr(0, 10));
  const currentDate = new Date();
  const timeDiffrentt = Math.abs(date - currentDate);

  return (
    <>
      <section className="section-cont prod-details-page">
        <div className="product-cont">
          {pageLoaad ? (
            <Loader />
          ) : product ? (
            <>
              <MetaData
                title={product.seo && product.seo[0].metatitle}
                keywords={product.seo && product.seo[0].keyword}
                content={product.seo && product.seo[0].metalink}
              />
              <div className="prod-warper">
                <div className="prod-row">
                  <div className="coll prod-coll cont-padd">
                    <div className="img-slider">
                      <div className="slide-img">
                        <div className="img-src">
                          <SingleProductLeft
                            item={product}
                            imgSlideFun={imgSlideFun}
                          />
                        </div>
                      </div>
                      <div className="slide-img slide-img-silde-cont">
                        <ul
                          style={{
                            transform: `translateX(-${imgIndex * 100}%)`,
                          }}
                        >
                          {product.imageId &&
                            product.imageId.map((item, i) => (
                              <li key={i} onClick={() => imgSlideFun(i)}>
                                <LazyLoadImages product={item} />
                              </li>
                            ))}
                        </ul>
                        <div className="product-discount">
                          {product.maxprice ? (
                            <span>
                              {Math.abs(
                                (
                                  ((product.price - product.maxprice) /
                                    product.maxprice) *
                                  100
                                ).toFixed(1)
                              )}
                              % OFF
                            </span>
                          ) : null}
                        </div>
                        <div className="product-nO">
                          {Math.floor(timeDiffrentt / (1000 * 60 * 60 * 24)) <
                          15 ? (
                            <span>new</span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="coll prod-coll">
                    <SingleProductRight item={product} imgIndex={imgIndex} />
                    <div className="stocks-q">
                      <p>
                        status:
                        <b
                          className={
                            product.stock < 1 ? "S-red-color" : "S-green-color"
                          }
                        >
                          {product.stock < 1 ? "Out of stock" : "Instock"}
                        </b>
                      </p>
                      <p>Product id: #{product._id}</p>
                    </div>

                    <div className="product-divider">
                      <div className="stock-cont">
                        <DialogActions>
                          <Button onClick={decreaseQuantity}>
                            <FaMinus />
                          </Button>
                        </DialogActions>
                        <input value={quentity} readOnly type="number" />
                        <DialogActions>
                          <Button onClick={increaseQuantity}>
                            <FaPlus />
                          </Button>
                        </DialogActions>
                      </div>

                      <div className="product-sticky-content">
                        <DialogActions>
                          <Button
                            disabled={product.stock < 1 ? true : false}
                            onClick={addToCartHandler}
                          >
                            <FaOpencart />
                            Add to Cart
                          </Button>
                        </DialogActions>
                      </div>
                      <div className="prod-wish">
                        <FaHeart onClick={addToWishtHandler} />
                      </div>
                    </div>
                    <div className="review-area">
                      <DialogActions>
                        <Button onClick={buyHandler}>Buy Now</Button>
                        <Button onClick={submitReviewToggle}>
                          <FaAngellist /> Add Review
                        </Button>
                      </DialogActions>
                      <Dialog
                        area-aria-labelledby="simpale-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                      >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                          <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={parseFloat(rating)}
                            readOnly={false}
                            name="dd"
                          />
                          <textarea
                            className="submitDialogtext"
                            cols="10"
                            rows="10"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={submitReviewToggle}>Cancle</Button>
                          <Button onClick={reviewSubmitHandler}>Submit</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </div>
                <div className="product-des-and-rate">
                  <div className="product-des-and-rate-tab">
                    <ul>
                      <li
                        className={showContent ? "prod-active-class" : null}
                        onClick={() => setShowContent(true)}
                      >
                        Description
                      </li>
                      <li
                        className={!showContent ? "prod-active-class" : null}
                        onClick={() => setShowContent(false)}
                      >
                        Reviews ({product && product.numOfReviews})
                      </li>
                    </ul>
                  </div>
                  <div
                    className={showContent ? "prod-des-show" : "prod-des-hide"}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product && product.article,
                      }}
                    />
                  </div>
                  <div
                    className={
                      !showContent
                        ? "prod-des-show -review-area"
                        : "prod-des-hide -review-area"
                    }
                  >
                    <h2>REVIEWS</h2>

                    <div className="review-cont">
                      <ReviewStar product={product} />

                      <div className="rev-col">
                        {product.reviews && product.reviews[0] ? (
                          <>
                            <div className="review-row">
                              {product.reviewsids.map((review, i) => {
                                
                                return (
                                  <ReviewCard
                                    key={i}
                                    review={review}
                                    length={product.numOfReviews}
                                  />
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <p className="noReview">NO Reviews yest</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <ProductSlider product={product} />
              </div>
            </>
          ) : (
            <>
              <p>Something is not found</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
