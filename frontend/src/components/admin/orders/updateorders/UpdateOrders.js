import React, { useEffect } from "react";
import { Aside } from "../../aside/Aside";
import { NavLink, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../layout/loader/Loader";
import {
  clearErrors,
  getMyorders,
  getOrderDetails,
} from "../../../../actions/OrderAction";
import UpdateOrderForm from "./assets/UpdateOrderForm";
import { getPaymentData } from "../../../../actions/Paymentaction";
import MetaData from "../../../layout/metaData/MetaData";

export const UpdateOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { loading, orders, error } = useSelector((state) => state.orderDetails);

  console.log(orders);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
    dispatch(getMyorders());
  }, [dispatch, error, alert, id]);

  return (
    <>
      <MetaData
        title={"Admin Update Order"}
        content={"Admin Update Order"}
        keywords={"Admin Update Order"}
      />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />

          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <div className="all-products-cont">
                  {loading ? (
                    <Loader />
                  ) : orders && orders ? (
                    <>
                      <div className="order-d-page">
                        <h1>Order's</h1>
                        <div className="order-containor">
                          <div className="order-header">
                            <div>
                              <p>Order ID #{orders._id} details</p>
                              <p><NavLink to={`/admin/update-orders/11/${orders && orders.paymentInfo && orders.paymentInfo.id}`}>ddddd</NavLink></p>
                              <p>
                                Payment via
                                {orders &&
                                  orders.paymentInfo &&
                                  orders.paymentInfo.data &&
                                  orders.paymentInfo.data[0] &&
                                  orders.paymentInfo.data[0].method}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <UpdateOrderForm id={id} orders={orders} />
                    </>
                  ) : (
                    <p>Order not fond</p>
                  )}
                </div>
              </section>
              <section className="section-cont">
                <div id="prod-cont" className="cont-area-h"></div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
