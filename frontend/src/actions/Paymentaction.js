import axios from "axios";
import {
  CLEAR_ERRORS,
  PAYMENT_DATA_FAIL,
  PAYMENT_DATA_REQUEST,
  PAYMENT_DATA_SUCCESS,
} from "../constants/PaymentConstants";

export const getPaymentData = (id) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_DATA_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/v1/paymentData/${id}`);
   
    dispatch({ type: PAYMENT_DATA_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({ type: PAYMENT_DATA_FAIL, payload: err });
  }
};

//---clear errors
export const ClearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
