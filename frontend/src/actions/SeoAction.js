import axios from "axios";
import { SEO_FAIL, SEO_REQUEST, SEO_SUCCESS } from "../constants/SeoConstants";

export const getAllSeo = () => async (dispatch) => {
  try {
    dispatch({ type: SEO_REQUEST });
    const { data } = await axios.get(`/api/v1/all-seo`);
    dispatch({ type: SEO_SUCCESS, payload: data.seo });
  } catch (error) {
    dispatch({ type: SEO_FAIL, payload: error.response.data.message });
  }
};

export const createSeoAction = () => async (dispatch) => {
  try {
    dispatch({ type: SEO_REQUEST });
    const { data } = await axios.get(`/api/v1/all-seo`);
    dispatch({ type: SEO_SUCCESS, payload: data.seo });
  } catch (error) {
    dispatch({ type: SEO_FAIL, payload: error.response.data.message });
  }
};

