import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  CLEAR_ERRORS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  All_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
} from "../constants/OrderConstants";

import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post("/api/v1/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getMyorders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");
    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data.Orders,
    });
  } catch (err) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.Order,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//-----------------admin

export const getAllorders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch({
      type: ALL_ORDER_SUCCESS,
      payload: data.Orders,
    });
  } catch (err) {
    dispatch({
      type: All_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateOrder =
  (
    id,
    status,
    name,
    address,
    city,
    pinCode,
    country,
    state,
    email,
    phoneNo,
    productId
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });
      const formData = new FormData();
      formData.append("status", status);
      formData.append("name", name);
      formData.append("address", address);
      formData.append("pinCode", pinCode);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("email", email);
      formData.append("phoneNo", phoneNo);
      formData.append("link", productId);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/order/${id}`,
        formData,
        config
      );

      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (err) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
