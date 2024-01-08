import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplyCoupen from "./ApplyCoupen";
export const ConfirmRight = ({ cartItem, shippingInfo }) => {

  const [coupon, setCoupon] = useState("");
  const [couponValid, setCouponValid] = useState("");
  const [discounted, setDiscounted] = useState("");

  const Navigate = useNavigate();
  const subtotal = cartItem.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingChargs = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = shippingChargs + tax + subtotal;
  // const address = `${shippingInfo.address},
  //   ${shippingInfo.city},
  //   ${shippingInfo.state},
  //   ${shippingInfo.pinCode},
  //   ${shippingInfo.country}
  //   `;

  const proccessPayment = () => {
    const data = {
      subtotal,
      shippingChargs,
      tax,
      totalPrice,
      coupon,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    Navigate("/shipping/proccess/payment");
  };

  //-------------- remove coupon

  const removeCoupon = () => {
    setDiscounted(0);
    setCoupon(null);
    setCouponValid(null);
  };

  return (
    <>
      <div className="conf-prod-det">
        <div>
          <ApplyCoupen
            setCoupon={setCoupon}
            setCouponValid={setCouponValid}
            subtotal={subtotal}
            setDiscounted={setDiscounted}
          />
          <p>{couponValid ? couponValid : null} </p>
        </div>
        {cartItem &&
          cartItem.map((item, i) => (
            <div className="conf-prod-area" key={i}>
              <div className="conf-ing">
                <img
                  src={`http://localhost:8000/${item.image}`}
                  alt={item.name}
                />
              </div>
              <p>{item.name}</p>
              <span>
                {item.quantity} x {item.price} =
                <b>{item.price * item.quantity} </b>
              </span>
            </div>
          ))}
        <div className="order-summery-conf">
          <div className="order-summery-conf-area">
            <p>
              <span> Sub total:</span>
              <span>{subtotal}</span>
            </p>
            {discounted ? (
              <>
                <p>
                  <span>
                    coupon:<span>{coupon ? coupon : null}</span>
                  </span>

                  <span>
                    RS {discounted ? discounted : null}
                    <span onClick={removeCoupon}>Remove</span>
                  </span>
                </p>
              </>
            ) : null}
            <p>
              <span>Shipping Charges:</span>
              <span>Rs{shippingChargs}</span>
            </p>
            <p>
              <span>GST:</span>
              <span>RS{tax}</span>
            </p>

            <p>
              <span>
                <b>Total:</b>
              </span>
              <span>Rs{totalPrice - (discounted ? discounted : 0)}</span>
            </p>
          </div>

          <Button onClick={proccessPayment}>Proccess to Payment</Button>
        </div>
      </div>
    </>
  );
};
