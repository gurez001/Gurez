import axios from "axios";
import {
  ALL_CATEGORIE_ERRORS,
  ALL_CATEGORIE_REQUEST,
  ALL_CATEGORIE_SUCCESS,
  NEW_CATEGORIE_FAIL,
  NEW_CATEGORIE_REQUEST,
  NEW_CATEGORIE_SUCCESS,
} from "../constants/CategoreConstants";

export const CreateNewCategore =
  (name, slug, title, parent, description, seotitle, keyword, metadec) =>
  async (dispatch) => {
    try {
      dispatch({ type: NEW_CATEGORIE_REQUEST });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("title", title);
      formData.append("parent", parent);
      formData.append("description", description);
      formData.append("seotitle", seotitle);
      formData.append("keyword", keyword);
      formData.append("metadec", metadec);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (parent === "") {
        const { data } = await axios.post(
          "/api/v1/create/categore",
          formData,
          config
        );

        dispatch({ type: NEW_CATEGORIE_SUCCESS, payload: data });
      } else {
        const { data } = await axios.post(
          "/api/v1/create/sub-categore",
          formData,
          config
        );

        dispatch({ type: NEW_CATEGORIE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: NEW_CATEGORIE_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIE_REQUEST });
    const { data } = await axios.get("/api/v1/all-categore");
    dispatch({ type: ALL_CATEGORIE_SUCCESS, payload: data.allCategores });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORIE_FAIL,
      payload: error.response.data.message || "Some error occurred",
    });
  }
};

//--------------------------- sub cat

export const CreateNewSubCategore =
  (name, slug, title, parent, description) => async (dispatch) => {
    try {
      dispatch({ type: NEW_CATEGORIE_REQUEST });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("title", title);
      formData.append("parent", parent);
      formData.append("description", description);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/create/sub-categore",
        formData,
        config
      );

      dispatch({ type: NEW_CATEGORIE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NEW_CATEGORIE_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: ALL_CATEGORIE_ERRORS });
};
