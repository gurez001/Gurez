import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ClearError, getProduct } from "../../../actions/ProductAction";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../home/assets/ProductCard";
import Loader from "../../layout/loader/Loader";

const ProductSlider = ({ product }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loding, error, products } = useSelector((state) => state.products);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4, // Adjust the number of slides to show
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledProducts = useMemo(() => {
    if (products) {
      const filteredProducts = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      return shuffleArray([...filteredProducts]);
    }
    return [];
  }, [products, product]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      <section className="silder-section">
        <div className="prod-slider-row">
          <div className="prod-slider-coll">
            <Slider {...settings}>
              {shuffledProducts &&
                shuffledProducts.map((item) => (
                  <div key={item._id}>
                    {loding ? (
                      <Loader />
                    ) : (
                      <>
                        <ProductCard product={item} />
                      </>
                    )}
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSlider;
