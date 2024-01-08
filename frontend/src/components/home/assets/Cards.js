import React from "react";

import "./cards.css";

import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Bestselling from "./Cards/Bestselling";
import BrandCard from "./Cards/BrandCard";
import TopSellingProducts from "./Cards/TopSellingProducts";
import BeautyCard from "./Cards/BeautyCard";
import BeautyItems from "./Cards/BeautyItems";

const Cards = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const navigeHandel = () => {
    navigate("/registration");
  };

  return (
    <section id="cards-section" className="section-cont">
      <div className="cont-area-h">
        <div className="desktop-grid-4 grid-container">
          <Bestselling />
          <BrandCard />
          <TopSellingProducts />
          <div className="desktop-grid-4-card">
            {user && user.verified ? (
              <>
                <h2>Hello!{user && user.name}</h2>
                <Button onClick={navigeHandel}>Demo..</Button>
              </>
            ) : (
              <>
                <h2>Sign in for your best experience</h2>
                <div>
                  <Button onClick={navigeHandel}>Sign in securely</Button>
                </div>
              </>
            )}
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default Cards;
