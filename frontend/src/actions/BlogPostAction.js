import axios from "axios";
import {
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  ALL_BLOG_FAILED,
  ALL_BLOG_CLEAR_ERROR,
} from "../constants/BlogPostConstants";
import {
  SINGLE_BLOGPAGE_REQUEST,
  SINGLE_BLOGPAGE_SUCCESS,
  SINGLE_BLOGPAGE_FAILED,
  SINGLE_BLOGPAGE_CLEAR_ERROR,
} from "../constants/BlogPostConstants";

export const GetBlogPost = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BLOG_REQUEST });

    const { data } = await axios.get("api/v1/blog/all-post");
    console.log(data);
    dispatch({
      type: ALL_BLOG_SUCCESS,
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: ALL_BLOG_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const ClearError = () => async (dispatch) => {
  dispatch({ type: ALL_BLOG_CLEAR_ERROR });
};

export const GetSingleBlogPage = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch({ type: SINGLE_BLOGPAGE_REQUEST });
    const { data } = await axios.get(`api/v1/blog/post/${id}`);
    console.log(data);
    dispatch({
      type: SINGLE_BLOGPAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_BLOGPAGE_FAILED,
      payload: error.response.data.message,
    });
  }
};
