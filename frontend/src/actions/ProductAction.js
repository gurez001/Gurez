import axios from "axios";
import {
  ALL_PRODUCT_ERRORS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCCT_DETAILS_REQUEST,
  PRODUCCT_DETAILS_SUCCESS,
  PRODUCCT_DETAILS_FAIL,
  ALL_CAT_FAIL,
  ALL_CAT_REQUEST,
  ALL_CAT_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  ALL_PRODUCT_SEARCH_REQUEST,
  ALL_PRODUCT_SEARCH_SUCCESS,
  ALL_PRODUCT_SEARCH_FAIL,
  ALL_FEATURE_PRODUCT_REQUEST,
  ALL_FEATURE_PRODUCT_SUCCESS,
  ALL_FEATURE_PRODUCT_FAIL,
  PRODUCT_STATUS_REQUEST,
  PRODUCT_STATUS_SUCCESS,
  PRODUCT_STATUS_FAIL,
} from "../constants/ProductConstants";

export const getProduct =
  (
    currentPage = 1,
    price = [0, 1000],
    ratings,
    categorie,
    subcategory,
    discount = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      if (ratings) {
        link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      }
      if (subcategory) {
        // link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${categorie}&ratings[gte]=${ratings}`;
        link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${categorie}&subcategory=${subcategory}&ratings[gte]=${ratings}`;
      }
      if (discount > 0) {
        link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${categorie}&ratings[gte]=${ratings}&discount=${discount}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const featureProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_FEATURE_PRODUCT_REQUEST });

    // let link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

    const { data } = await axios.get("/api/v1/feature-product");

    dispatch({
      type: ALL_FEATURE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: ALL_FEATURE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const searchProduct = (searchData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_SEARCH_REQUEST });
    const { data } = await axios.get(`/api/v1/products?keyword=${searchData}`);
    dispatch({ type: ALL_PRODUCT_SEARCH_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ALL_PRODUCT_SEARCH_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCCT_DETAILS_SUCCESS,
      payload: data.Product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCategorie =
  (currentPage = 1, price = [0, 1000], categorie, ratings, discount = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_CAT_REQUEST });

      let link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      if (ratings) {
        link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      }
      if (categorie) {
        // link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${categorie}&ratings[gte]=${ratings}`;
        link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${categorie}&ratings[gte]=${ratings}`;
      }
      if (discount > 0) {
        link = `/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${categorie}&ratings[gte]=${ratings}&discount=${discount}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_CAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CAT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.Product,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//----------get all product for admin

export const adminGetAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.Products,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const createNewProduct =
  (
 

    name,
        slug,
        price,
        maxPrice,
        content,
        article,
        parent,
        imageIds,
        stock,
        seotitle,
        seometadec,
        seokeyword,
        seometalink
  ) =>
  async (dispatch) => {

    try {
      dispatch({ type: NEW_PRODUCT_FAIL });

      const formData = new FormData();

      // Append other fields
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("price", price);
      formData.append("maxprice", maxPrice);
      formData.append("description", content);
      formData.append("article", article);
      formData.append("category", parent);
      formData.append("stock", stock);
      formData.append("seotitle", seotitle);
      formData.append("seometadec", seometadec);
      formData.append("seokeyword", seokeyword);
      formData.append("seometalink", seometalink);

      for (let i = 0; i < imageIds.length; i++) {
        formData.append("imageId", String(imageIds[i]));
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `/api/v1/product/new`,
        formData,
        config
      );

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error,
      });
    }
  };

//--------------delete product by admin

export const deleteAdminProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

//---update adminproduct

export const updateAdminProduct = (id, productData) => async (dispatch) => {
  try {
    const {
      name,
      slug,
      price,
      maxprice,
      description,
      article,
      parent,
      stock,
      currentImageArray,
      seotitle,
      seokeyword,
      seometadec,
      seometalink, }= productData;


    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  
    const formData = new FormData();

    // Append other fields
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("price", price);
    formData.append("maxprice", maxprice);
    formData.append("description", description);
    formData.append("article", article);
    formData.append("category", parent);
    formData.append("stock", stock);
    formData.append("seotitle", seotitle);
    formData.append("seokeyword", seokeyword);
    formData.append("seometadec", seometadec);
    formData.append("seometalink", seometalink);

    // Append each file individually
    for (let i = 0; i < currentImageArray.length; i++) {
      formData.append("imageIds", currentImageArray[i]);
    }

    const { data } = await axios.put(`/api/v1/product/${id}`, formData, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getAllReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/review?id=${id}`);
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/review?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const updateProductStatus = (id, status) => async (dispatch) => {
  try {
 
    dispatch({ type: PRODUCT_STATUS_REQUEST });

    const formdata = new FormData();
    formdata.append("status", status);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //   const data = 'dddd'
    const { data } = axios.put(
      `/api/v1/product/status/${id}`,
      formdata,
      config
    );
    dispatch({ type: PRODUCT_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//---clear errors
export const ClearError = () => async (dispatch) => {
  dispatch({ type: ALL_PRODUCT_ERRORS });
};
