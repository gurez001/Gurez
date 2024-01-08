import { DialogActions, Button } from "@material-ui/core";
import React from "react";
import { FaHeart, FaOpencart } from "react-icons/fa6";

const AddToCartBtn = ({ product, addToCartHandler, buyHandler }) => {
  return (
    <>
      <div className="product-sticky-content">
        <DialogActions>
          <Button
            disabled={product && product.stock < 1 ? true : false}
            onClick={addToCartHandler}
          >
            <FaOpencart />
            Add to Cart
          </Button>
        </DialogActions>
      </div>
      <div className="prod-wish">
        <Button
        onClick={buyHandler}
        >
          Buy Now
        </Button>
      </div>
    </>
  );
};

export default AddToCartBtn;
