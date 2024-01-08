import React from "react";
import { StarComponent } from "./StarComponent";

export const ReviewStar = ({ product }) => {
 
  if (!product || (!product && product.reviewsids && product.reviewsids[0])) {
    return null; // Handle the case where product or reviews are undefined
  }

  const starValue = [0, 0, 0, 0, 0];
  const starInPercentage = [0, 0, 0, 0, 0];

  const reviewLength =
    product && product.reviewsids && product.reviewsids.length;
  // if (product.reviewsids.length > 0) {
  //   product.reviewsids.forEach((review) => {
  //     const rating = review.rating;
  //     starValue[rating - 1] += rating;
  //     starInPercentage[rating - 1] += 100 / reviewLength;
  //   });
  // }

  return (
    <div className="rating-col">
      <div className="rating-wrap">
        <div className="heading">
          <div className="he-content">
            <div className="avg-rating-container">
              <div>
                <h3>{product.ratings ? product.ratings.toFixed(2) : "0"}</h3>
              </div>
              <div>
                <p>Average Rating</p>
                <div>
                  <StarComponent review={product.ratings || 0} />
                  <div>({reviewLength} Reviews)</div>
                </div>
              </div>
            </div>
            <div className="he-cont-rating">
              {starValue.map((item, i) => (
                <div key={i} className="he-ratings">
                  <StarComponent review={item} />
                  <div className="rating-progress">
                    <div className="rating-progress-bar">
                      <span
                        style={{
                          width: `${Math.round(starInPercentage[i])}%`,
                        }}
                        className="rating-progress-bar-area"
                      ></span>
                    </div>
                    <span>{Math.round(starInPercentage[i])}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="ratings-list"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
