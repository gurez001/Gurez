import axios from "axios";
import {
  BLOG_CATEGORY_REQUEST,
  BLOG_CATEGORY_SUCCESS,
  BLOG_CATEGORY_FAILED,
  CATEGORY_CLEAR_ERROR,
} from "../constants/BlogCategoryConstant";

export const GetBlogCategory = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_CATEGORY_REQUEST });
    const { data } = await axios.get("/api/v1/blog/all-categore");

    dispatch({
      type: BLOG_CATEGORY_SUCCESS,
      payload: data.allCategores,
    });
  } catch (error) {
    dispatch({
      type: BLOG_CATEGORY_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const ClearError = () => async (dispatch) => {
  dispatch({ type: CATEGORY_CLEAR_ERROR });
};
