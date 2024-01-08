import {
  ALL_CATEGORIE_ERRORS,
  ALL_CATEGORIE_FAIL,
  ALL_CATEGORIE_REQUEST,
  ALL_CATEGORIE_SUCCESS,
  NEW_CATEGORIE_FAIL,
  NEW_CATEGORIE_REQUEST,
  NEW_CATEGORIE_RESET,
  NEW_CATEGORIE_SUCCESS,
} from "../constants/CategoreConstants";

export const newCategoreReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_CATEGORIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CATEGORIE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case NEW_CATEGORIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_CATEGORIE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case ALL_CATEGORIE_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getAllCategoriesReducer = (state = { allcategroes: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_CATEGORIE_SUCCESS:
      return {
        ...state,
        loading: false,
        allcategroes: action.payload,
      };
    case ALL_CATEGORIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ALL_CATEGORIE_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
