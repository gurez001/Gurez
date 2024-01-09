import axios from "axios";
import {
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  ALL_BLOG_FAILED,
  ALL_BLOG_CLEAR_ERROR,
  SINGLE_BLOG_POST_REQUEST,
  SINGLE_BLOG_POST_SUCCESS,
  SINGLE_BLOG_POST_FAILED,
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILED,
} from "../constants/BlogPostConstants";

export const GetBlogPost = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BLOG_REQUEST });

    const { data } = await axios.get("/api/v1/blog/all-post");

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

//-------------------------single post page

export const singleBlogPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_BLOG_POST_REQUEST });

    const { data } = await axios.get(`/api/v1/blog/post/${id}`);
    console.log(data);
    dispatch({
      type: SINGLE_BLOG_POST_SUCCESS,
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_BLOG_POST_FAILED,
      payload: error.response.data.message,
    });
  }
};

//-------------- create post

export const CreateBlogPost =
  (selectedCategoryId, title, description, slug) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BLOG_POST_REQUEST });

      const formData = new FormData();

      formData.append('category',selectedCategoryId);
      formData.append('title',title);
      formData.append('description',description);
      formData.append('slug',slug);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`/api/v1/blog/add-new-post`,formData,config);
     console.log(data)
      dispatch({
        type: CREATE_BLOG_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BLOG_POST_FAILED,
        payload: error.response.data.message,
      });
    }
  };

export const ClearError = () => async (dispatch) => {
  dispatch({ type: ALL_BLOG_CLEAR_ERROR });
};
