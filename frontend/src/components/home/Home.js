import React, { useEffect } from "react";
import HeroSection from "./assets/HeroSection";
import "./style.css";
import { ClearError, featureProduct, getProduct } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Product from "./assets/ProductCard";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { CategorySection } from "./assets/CategorySection";
import CoupenSection from "./assets/CoupenSection";
import MetaData from "../layout/metaData/MetaData";
import Cards from "./assets/Cards";
import HeroSlider from "./assets/HeroSlider";

export const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loding, error, products } = useSelector((state) => state.products);
  const { error:fProductError } = useSelector((state) => state.productFeature);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if(fProductError){
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(getProduct());
    dispatch(featureProduct());
  }, [dispatch, error, alert,fProductError]);

  return (
    <>
      <MetaData
        title={"Home"}
        content={"Discover toy fectory"}
        keywords={"toys"}
      />
      {loding ? (
        <Loader />
      ) : (
        <>
          {/* <HeroSection />  */}
          <HeroSlider />
          <Cards />
          {/* <CategorySection /> */}
          <section id="homepage" className="section-cont">
            <div className="coll-title">
              <h2>Feature Products</h2>
            </div>
            <div id="prod-cont" className="prod-cont cont-area-h">
              <div className="prod-cont-row grid-container">
                {products &&
                  products.slice(0, 4).map((product, i) => (
                    <div className="coll prod-collem" key={i}>
                      <Product key={product._id} product={product} />
                    </div>
                  ))}
              </div>
            </div>
          </section>
          <CoupenSection />
        </>
      )}
    </>
  );
};
