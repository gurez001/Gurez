import {
  PAYMENT_PROCCESS_FAIL,
  PAYMENT_PROCCESS_REQUEST,
  PAYMENT_PROCCESS_RESET,
  PAYMENT_PROCCESS_SUCCESS,
  CLEAR_ERRORS,
  PAYMENT_DATA_FAIL,
  PAYMENT_DATA_SUCCESS,
  PAYMENT_DATA_REQUEST,
  PAYMENT_DATA_RESET,
} from "../constants/PaymentConstants";

export const paymentReducer = (state = { paymentData: [] }, action) => {
  switch (action.type) {
    case PAYMENT_PROCCESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_PROCCESS_SUCCESS:
      return {
        loading: false,
        isUpdate: action.payload,
      };

    case PAYMENT_PROCCESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PAYMENT_PROCCESS_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const paymentDataReducer = (state = { paymentData: [] }, action) => {
  switch (action.type) {
    case PAYMENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_DATA_SUCCESS:
      return {
        loading: false,
        paymentData: action.payload,
      };
    case PAYMENT_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PAYMENT_DATA_RESET:
      return {
        ...state,
        loading: false,
        paymentData: null,
      };
    default:
      return state;
  }
};
