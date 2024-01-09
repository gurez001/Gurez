import React from "react";
import { CiHome } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { StarComponent } from "./StarComponent";
const Details = ({ product }) => {

  const reviewLength =
    product && product.reviewsids && product.reviewsids.length;
  const sum =
  product && product.reviewsids
    ? product.reviewsids.reduce((acc, review) => acc + review.rating, 0)
    : 0;

    const average =sum/ reviewLength ;

  return (
    <>
      <div className="summary entry-summary">
        <div className="product-navigation">
          <ul>
            <li>
              <NavLink to={"/"}>
                <CiHome />
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/product-category/${
                  product && product.category && product.category.slug
                }`}
              >
                {product && product.category && product.category.name}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/product-category/${
                  product && product.category && product.category.slug
                }/${
                  product && product.subcategory !== null
                    ? product && product.subcategory && product.subcategory.slug
                    : ""
                }`}
              >
                {product && product.subcategory !== null
                  ? product && product.subcategory && product.subcategory.name
                  : ""}
              </NavLink>
            </li>
            <li>{String(product && product.name).substr(0, 15)}...</li>
          </ul>
        </div>
        <h1 className="product_title entry-title">{product && product.name}</h1>
        <div className="product_meta">
          <span>Id: #{product && product._id}</span>
          <span>
            CATEGORY:
            <NavLink
              to={
                product && product.subcategory !== null
                  ? `/product-category/${
                      product && product.category && product.category.slug
                    }/${
                      product && product.subcategory && product.subcategory.slug
                    }`
                  : `/product-category/${
                      product && product.category && product.category.slug
                    }`
              }
            >
              {product && product.subcategory !== null
                ? product && product.subcategory && product.subcategory.name
                : product && product.category && product.category.name}
            </NavLink>
          </span>
        </div>
        <div className="product-price">
          <p>
            ₹{product && product.price} - ₹{product && product.maxprice}
          </p>
        </div>
        <div className="ratings">
          <StarComponent review={average} />
          <div className="numOfReviews">
            (
            <span>
              {product && product.reviewsids && product.reviewsids.length}
            </span>
            <span>Reviews</span> )
          </div>
        </div>
        <div className="short-description">
          <div
            dangerouslySetInnerHTML={{ __html: product && product.description }}
          />
        </div>
        <div className="price">
          <p>
            <ins>
              <span> ₹{product && product.price}</span>
            </ins>
            -
            <del>
              <span>₹{product && product.maxprice}</span>
            </del>
          </p>
        </div>
        <div className="stocks-q">
          <p>
            status:
            <b
              className={
                product && product.stock < 1 ? "S-red-color" : "S-green-color"
              }
            >
              {product && product.stock < 1 ? "Out of stock" : "Instock"}
            </b>
          </p>
        </div>
      </div>
    </>
  );
};

export default Details;
