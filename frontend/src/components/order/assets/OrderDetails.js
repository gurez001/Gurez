import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";
import { clearErrors, getOrderDetails } from "../../../actions/OrderAction";
import { NavLink, useParams } from "react-router-dom";
import TimeAndDate from "../../layout/time/TimeAndDate";
import MetaData from "../../layout/metaData/MetaData";
import { getPaymentData } from "../../../actions/Paymentaction";

export const OrderDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.orderDetails);

  let { shippingInfo, paymentInfo, orderItem } = orders ? orders : {};

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
    dispatch(getPaymentData());
  }, [dispatch, error, alert, id]);

  return (
    <>
  
      <MetaData title={'My Order Details'} content={'My Order Details'} keywords={'My Order Details'} />
      <section className="section-cont">
        <div id="order-details" className="cont-area-h">
          {loading ? (
            <Loader />
          ) : orders && orders ? (
            <>
              <div className="order-d-page">
                <h1>Order's</h1>
                <h2>
                  <NavLink to={`/order/${orders._id}/123`} >123 </NavLink>
                  
                </h2>
                <div className="order-containor">
                  <div className="order-header">
                    <div>
                      <p>Order ID #{orders._id}</p>
                    </div>
                    <div>
                      <p>
                        Order status <span>{orders.orderStatus}</span>
                      </p>
                    </div>
                  </div>
                  <div className="order-details">
                    <div className="billing-details">
                      <h2>Billing details</h2>
                      <div className="Billing-details-area">
                        {shippingInfo && shippingInfo ? (
                          <>
                            <p>{shippingInfo.fullName}</p>
                            <p>{shippingInfo.phoneNo}</p>
                            <p>{shippingInfo.address}</p>
                            <p>{shippingInfo.city}</p>
                            <p>{shippingInfo.pinCode}</p>
                            <p>{shippingInfo.state}</p>
                            <p>{shippingInfo.country}</p>
                          </>
                        ) : (
                          <p>Shipping details not found</p>
                        )}
                        <p>
                          <span>Shipping charges</span>
                          <span>{orders.shippingPrice}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pay-mode">
                      <h2>Payment via</h2>

                      <div className="pay-mod-details">
                        {paymentInfo && paymentInfo ? (
                          <>
                            <p>
                              <span>Mode:</span>
                              <span>{paymentInfo.mode}</span>
                            </p>
                            <p>
                              <span>Payment Id:</span>
                              <span>{paymentInfo.id}</span>
                            </p>
                            <p>
                              <span>Payment status:</span>
                              <span>{paymentInfo.status}</span>
                            </p>
                          </>
                        ) : (
                          <p>Ooops.. Data not found</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="orders">
                    <h2>My Items</h2>
                    {orderItem &&
                      orderItem.map((item, i) => {
                        return (
                          <div key={i} className="order-item">
                            <div className="order-item-img">
                              <img
                                src={`http://localhost:8000/${item.image[0]}`}
                                alt={item.name}
                              />
                            </div>
                            <div className="order-item-name">
                              <h3>{item.name}</h3>
                            </div>
                            <div className="order-item-price">
                              <p>
                                <span>₹{item.price}</span>x
                                <span>{item.quantity}</span>
                              </p>
                            </div>
                            <div className="order-item-total">
                              <p>₹{item.price * item.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <h3>
                    <TimeAndDate time={orders.creditAt} />
                  </h3>
                </div>
              </div>
            </>
          ) : (
            <p>Order not fond</p>
          )}
        </div>
      </section>
    </>
  );
};
