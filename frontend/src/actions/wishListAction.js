import { ADD_TO_WISHLIST, REMOVE_WISHLIST_ITEM } from "../constants/WishListConstants";
import axios from "axios";
export const wishListAction = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
 
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      productId: data.Product._id,
      link: data.Product.slug,
      name: data.Product.name,
      price: data.Product.price,
      path: data.Product.imageId[0].path,
      category:data.Product.category,
    },
  });
  localStorage.setItem(
    "wishListItems",
    JSON.stringify(getState().wishList.wishL)
  );
};


export const removeWishItem = (id) => async (dispatch, getState) => {
  if (!Array.isArray(id)) {
    dispatch({
      type: REMOVE_WISHLIST_ITEM,
      payload: id,
    });
  
    localStorage.setItem("wishListItems", JSON.stringify(getState().wishList.wishL));
  } else {
    localStorage.removeItem("wishListItems");
  }
};