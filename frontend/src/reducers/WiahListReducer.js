import { ADD_TO_WISHLIST, REMOVE_WISHLIST_ITEM } from "../constants/WishListConstants";

export const WishListReducer = (state = { wishL: [] }, action) => {

 
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;

      const isItemExist = state.wishL.find((i) => {
        return i.productId === item.productId;
      });

      if (isItemExist) {
        return {
          ...state,
          wishL: state.wishL.map((i) =>
          { return i.productId === isItemExist.productId ? item : i}
          ),
        };
      } else {
        return {
          ...state,
          wishL: [...state.wishL, item], // Fix the typo here
        };
      }
      case REMOVE_WISHLIST_ITEM:
        return {
          ...state,
          wishL: state.wishL.filter((i) => {
  
            return i.productId !== action.payload;
          }),
        };
      default:
        return state;
    }
};
