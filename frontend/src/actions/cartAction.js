import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_ITEM,
} from "../constants/CartConstants";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  console.log(id, quantity)
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      productId: data.Product._id,
      link: data.Product.slug,
      name: data.Product.name,
      price: data.Product.price,
      image: data.Product.imageId[0].path      ,
      stock: data.Product.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItem));
};

export const removeCartItem = (id) => async (dispatch, getState) => {

 
  if (!Array.isArray(id)) {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItem));
  } else {
    localStorage.removeItem("cartItems");
  }
};

export const saveShippingInfo = (data) => async (dispatch,getState) => {
  
  dispatch({
    type: SAVE_SHIPPING_ITEM,
    payload: data,
  });
  localStorage.setItem("shippinginfo", JSON.stringify(getState().cart.shippinginfo));
};
