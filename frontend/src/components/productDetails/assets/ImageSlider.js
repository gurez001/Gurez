import React from "react";
import LazyLoadImages from "../../layout/lazyload/LazyLoadImages";

const ImageSlider = ({ product, imgIndex, imgSlideFun }) => {
  const date = new Date(String(product?.createdate).substr(0, 10));
  const currentDate = new Date();
  const timeDiffrentt = Math.abs(date - currentDate);
  return (
    <>
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
                  ((product.price - product.maxprice) / product.maxprice) *
                  100
                ).toFixed(1)
              )}
              % OFF
            </span>
          ) : null}
        </div>
        <div className="product-nO">
          {Math.floor(timeDiffrentt / (1000 * 60 * 60 * 24)) < 15 ? (
            <span>new</span>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
