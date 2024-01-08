import React, { useEffect, useMemo } from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
// import {TreeView} from '@material-ui/icons/ex'
import { NavLink } from "react-router-dom";
import {
  FaGauge,
  FaArrowRightArrowLeft,
  FaBagShopping,
  FaUserLarge,
  FaStar,
} from "react-icons/fa6";
import Logo from "../../layout/header/assets/Logo";
import "./aside.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllorders } from "../../../actions/OrderAction";

export const Aside = ({ status }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);

  const orderLength = useMemo(() => {
    if (orders) {
      const orderlength = orders.filter(
        (item) => item.orderStatus === "Processing"
      );
      return orderlength.length;
    }
    return [];
  }, [orders]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllorders());
  }, [alert, error, dispatch]);

  return (
    <div className="dashboard-sidebar">
      <aside>
        <div className="s-sidebar-containor">
          <div className="s-side-row">
            <div>
              <Logo />
            </div>
            <div>
              <p>
                <span>
                  <FaGauge />
                </span>
                <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>
              </p>
      
                <TreeView>
                  <span>
                    <FaStar />
                  </span>
                  <TreeItem nodeId="1" label="Media">
                    <NavLink to={"/admin/upload/media-new"}>
                      <TreeItem nodeId="2" label="Add new media file" />
                    </NavLink>
                    <NavLink to={"/admin/upload/library"}>
                      <TreeItem nodeId="2" label="Library" />
                    </NavLink>
                  </TreeItem>
                </TreeView>
       
              <TreeView>
                <span>
                  <FaArrowRightArrowLeft />
                </span>
                <TreeItem nodeId="1" label="Products">
                  <NavLink to={"/admin/all-products"}>
                    <TreeItem nodeId="2" label="All" />
                  </NavLink>
                  <NavLink to={"/admin/create-product"}>
                    <TreeItem nodeId="2" label="Create" />
                  </NavLink>
                  <NavLink to={"/admin/categorie"}>
                    <TreeItem nodeId="2" label="Categorie" />
                  </NavLink>
                </TreeItem>
              </TreeView>
              <TreeView>
                <span>
                  <FaArrowRightArrowLeft />
                </span>
                <TreeItem nodeId="1" label="Post">
                  <NavLink to={"/admin/post/all-post"}>
                    <TreeItem nodeId="2" label="All Post" />
                  </NavLink>
                  <NavLink to={"/admin/post/add-new-post"}>
                    <TreeItem nodeId="2" label="Add New Post" />
                  </NavLink>
                </TreeItem>
              </TreeView>
              <TreeView>
                <span>
                  <FaArrowRightArrowLeft />
                </span>
                <TreeItem nodeId="1" label="Analytics">
                  <NavLink to={"/admin/analytics/overview"}>
                    <TreeItem nodeId="2" label="Overview" />
                  </NavLink>
                  <NavLink to={"/admin/analytics/product"}>
                    <TreeItem nodeId="2" label="Product" />
                  </NavLink>
                  <NavLink to={"/admin/analytics/revenue"}>
                    <TreeItem nodeId="2" label="Revenue" />
                  </NavLink>
                  <NavLink to={"/admin/analytics/order"}>
                    <TreeItem nodeId="2" label="Order" />
                  </NavLink>
                </TreeItem>
              </TreeView>

              <p className="order-tab">
                <span>
                  <FaBagShopping />
                </span>
                <NavLink to={"/admin/orders"}>
                  Orders
                  <span className="order-pe-">
                    {orderLength > 0 ? orderLength : null}
                  </span>
                </NavLink>
              </p>
              <p>
                <span>
                  <FaUserLarge />
                </span>
                <NavLink to={"/admin/users"}>Users</NavLink>
              </p>
              <p>
                <span>
                  <FaStar />
                </span>
                <NavLink to={"/admin/reviews"}>Reviews</NavLink>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
