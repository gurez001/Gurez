import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { addItemsToCart } from "../../../actions/cartAction";
import { useDispatch } from "react-redux";
import LazyLoadImages from "../../layout/lazyload/LazyLoadImages";
import { FaHeart } from "react-icons/fa6";
import { wishListAction } from "../../../actions/wishListAction";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const options = {
    value: product.ratings,
    precision: 0.5,
    size: "medium",
    readOnly: true,
  };

  const buyNow = (id, qunty) => {
    dispatch(addItemsToCart(id, qunty));
    Navigate("/cart");
  };

  const date = new Date(String(product.createdate).substr(0, 10));
  const currentDate = new Date();
  const timeDifferent = Math.abs(currentDate - date);

  const addToWishtHandler = (id) => {
    dispatch(wishListAction(id));
  };

  return (
    <>
      <div className="product-card">
        <div className="product-card-row">
          <div className="prod-img-cont">
            <div className="prod-card-img">
              {/* {product.images && product.imageId[0] && (
                // <img
                //   src={
                //     Array.isArray(product.imageId)
                //       ? `http://localhost:8000/${product.imageId[0].path}`
                //       : null
                //   }
                //   alt={product.name}
                // />
                )} */}
              <LazyLoadImages product={product.images && product.imageId[0]} />
              <div className="prod-wish">
                <FaHeart
                  onClick={() => addToWishtHandler(product._id && product._id)}
                />
              </div>
            </div>
            <div className="product-discount">
              {product.maxprice ? (
                <span>
                  {Math.abs(
                    (
                      ((product.price - product.maxprice) / product.maxprice) *
                      100
                    ).toFixed(1)
                  )}
                  % OFF
                </span>
              ) : null}
            </div>

            <div className="product-nO">
              {Math.floor(timeDifferent / (1000 * 60 * 60 * 24)) < 15 ? (
                <span>new</span>
              ) : null}
            </div>
          </div>
          <div className="product-details">
            <div className="product-price space-set">
              <span>₹{product.price}</span>
            </div>
            <h3>
              <Link
                className="product-card space-set font-size-cont"
                to={`/product/${product.seo[0].metalink}`}
              >
                {product.name.substr(0, 50)}...
              </Link>
            </h3>
            <div className="rev-are space-set">
              <Rating {...options} />
              <span className="rev-tot">
                (
                {product.numOfReviews < 1 ? "No reviews" : product.numOfReviews}
                )
              </span>
            </div>
            {/* <div className="product-card-dis space-set">
              <div className="prod-card-description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div> */}
            <div className="product-cat space-set">
              <p>
                <Link
                  to={`/product-category/${product.category.slug}/${
                    product.subcategory !== null
                      ? product.subcategory.slug
                      : " "
                  }`}
                >
                  {product.category.name}
                </Link>
              </p>
            </div>
          </div>
          <div className="product-card_btn space-set">
            <button onClick={() => buyNow(product.seo[0].metalink, 1)}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
