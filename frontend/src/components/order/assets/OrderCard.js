import React from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import TimeAndDate from "../../layout/time/TimeAndDate";
import { NavLink } from "react-router-dom";
export const OrderCard = ({ orders }) => {
  return (
    <>
      <div className="order-card-containor">
        <div className="order-card-row">
          {orders &&
            orders.map((item, i) => (
              <div key={i} className="order-card">
                <NavLink to={`/order/${item._id}`}>
                  <div
                    className={`order-card-inner-row ${
                      item.orderStatus === "Processing"
                        ? "process"
                        : item.orderStatus === "Shipped"
                        ? "shipped"
                        : item.orderStatus === "Delivered"
                        ? "delivered"
                        : item.orderStatus === "Cancle"
                        ? "cancle"
                        : item.orderStatus === "Return"
                        ? "return"
                        : null
                    }`}
                  >
                    <div className="order-id">
                      <span>
                        <FaCartArrowDown />
                      </span>
                      <span>#{item._id}</span>
                    </div>
                    <div className="order-card-status">
                      <span>{item.orderStatus}</span>
                      <span>₹{item.totalPrice}</span>
                      <span>{item.orderItem[0].quantity}</span>
                      <TimeAndDate time={item.creditAt} />
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
