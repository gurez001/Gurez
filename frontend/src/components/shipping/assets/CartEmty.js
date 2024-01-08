import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../../layout/metaData/MetaData";

const CartEmty = (loading) => {
  const Navigate = useNavigate();
  const [reTime, setreTime] = useState(5);
  const { cartItem } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!loading || cartItem < 1) {
      let timer = setInterval(() => {
        if (reTime > 0) {
          setreTime(reTime - 1);
        } else {
          clearInterval(timer);
          Navigate("/shop");
        }
      }, 1000);
    }
  }, [Navigate, reTime, cartItem, loading]);

  return (
    <>
      <MetaData
        title={"Empty Cart"}
        content={"Empty Cart"}
        keywords={"Empty Cart"}
      />
      <div className="cart-emty">
        <h2>You are not Selecting any product</h2>
        <p>Redirecting to Shop Page in {reTime} sec</p>
      </div>
    </>
  );
};

export default CartEmty;
