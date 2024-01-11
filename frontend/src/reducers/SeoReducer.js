import { SEO_FAIL, SEO_REQUEST, SEO_SUCCESS } from "../constants/SeoConstants";

export const seoReducer = (state = { seo: [] }, action) => {
  switch (action.type) {
    case SEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEO_SUCCESS:
      return {
        loading: false,
        seoData: action.payload,
      };
    case SEO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
