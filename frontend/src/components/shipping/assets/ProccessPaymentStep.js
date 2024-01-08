import React, { useEffect, useState } from "react";
import { CheckoutStep } from "./CheckoutStep";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
//import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../../actions/OrderAction";
import CartEmty from "./CartEmty";
import { removeCartItem } from "../../../actions/cartAction";
import { OrderBtn } from "./OrderBtn";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/metaData/MetaData";

const ProccessPaymentStep = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo") || "[]");

  const alert = useAlert();
  //const payBtn = useRef(null);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippinginfo, cartItem } = useSelector((state) => state.cart);
  //const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const [payMode, setPayMode] = useState(false);
  //const [dataId, setDataId] = useState("");

  // const paymentData = {
  //   amount: Math.round(orderInfo.totalPrice * 100),
  // };

  const paymentHeandleCod = (e) => {
    e.preventDefault();
    const order = {
      shippinginfo,
      orderItem: cartItem,
      itemPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingChargs,
      totalPrice: orderInfo.totalPrice,
      coupon:orderInfo.coupon
      //  razorpay_payment_id: dataId,
    };

    if (payMode === false) {
      order.paymentInfo = {
        mode: "COD",
      };
      dispatch(createOrder(order));
      cartItem.forEach(item => {
        dispatch(removeCartItem(item.productId));
      });
       Navigate("/order/success");
      // window.location.reload();
      alert.success("order connferm");
    } else {
      alert.error("There is something wrong please try again");
    }
  };

  const paymentHeandleInput = async (e) => {
    e.preventDefault();
    // payBtn.current.disabled = true;
    try {
      const amount = orderInfo.totalPrice;

      const { data } = await axios.post("/api/v1/payment/process", { amount });

      const order = {
        shippinginfo,
        orderItem: cartItem,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingChargs,
        totalPrice: orderInfo.totalPrice,
        razorpay_order_id: data.order.id,
      };
      order.paymentInfo = {
        mode: "online",
      };
      dispatch(createOrder(order));
      //--call function

      razorpay(data.order.amount, data.order.id, order.shippinginfo);
    } catch (err) {
      // payBtn.current.disabled = true;
      alert.error(err.message);
    }
  };

  async function razorpay(amount, id, details) {
    try {
      // key from backend
      const {
        data: { key },
      } = await axios.get("/api/v1/getkey");

      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "doll",
        description: "Test Transaction",
        image: "./Logo.jpg",
        order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:8000/api/v1/paymentverification",
        prefill: {
          name: details.fullName,
          email: details.email,
          contact: details.phoneNo,
        },
        notes: {
          address: details.address,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.on("payment.success", function (response) {
        // Handle success

        Navigate("/");
        // Dispatch the success action here
        // dispatch({ type: PAYMENT_PROCCESS_SUCCESS, payload: data });
      });

      razor.on("payment.error", function (error) {
        // Handle error
        // You can dispatch an action or perform other actions here
      });
      razor.open();

      // e.preventDefault();

      //--------------------------------------------------------------------------------------------------------

      dispatch(removeCartItem(cartItem));
      // Navigate("/order/success");
      // window.location.reload();
      // alert.success("order connferm");
    } catch (err) {}
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  return (
    <>
      <MetaData
        title={"Payment Proccess"}
        content={"Payment Proccess"}
        keywords={"Payment Proccess"}
      />
      <CheckoutStep activeStep={2} />
      <section className="section-cont">
        <div id="pay-cont" className="cont-area-h">
          {cartItem < 1 ? (
            <CartEmty />
          ) : (
            <>
              <div className="pay-cont">
                <div className="paytitle">
                  <h1>Payment Methods</h1>
                </div>
                <div className="payoption">
                  <div className="pay-cod">
                    <div className="pay-cod-opt">
                      <input
                        type="radio"
                        id="COD"
                        value="COD"
                        name="mode"
                        defaultChecked
                        onChange={() => setPayMode(false)}
                      />
                      <label htmlFor="COD">Cash on delivery</label>
                    </div>
                    <p>
                      <b>Pay with cash upon delivery.</b>
                    </p>
                  </div>
                  <div className="pay-online">
                    <input
                      name="mode"
                      type="radio"
                      id="Online"
                      value="Online"
                      onChange={() => setPayMode(true)}
                    />
                    <label htmlFor="Online">
                      Credit Card/Debit Card/NetBanking
                    </label>
                  </div>
                </div>
              </div>
              {payMode ? (
                <>
                  <div className="pay-razor-btn">
                    <Button className="order" onClick={paymentHeandleInput}>
                      Place Order
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="pay-cod-btn">
                    {/* <button onClick={paymentHeandleCod}>
                      PLACE ORDER ₹ ${orderInfo && orderInfo.totalPrice}
                    </button> */}
                    <OrderBtn paymentHeandleCod={paymentHeandleCod} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProccessPaymentStep;
