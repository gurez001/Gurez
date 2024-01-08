import React from "react";
import { NavLink } from "react-router-dom";

export const FootRight = () => {
  return (
    <>
      <div className="foot-right-row foot">
        <div className="foot-right-col">
          <h4>PRODUCT CATEGORIES</h4>
          <ul className="foot-list">
            <li>
              <NavLink to={"/"}>Animals</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Branded</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Disney</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Contact Us</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>My Account</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Refund Policy</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Shop</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Wishlist</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
