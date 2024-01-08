import React from "react";
import { NavLink } from "react-router-dom";

export const FootMid = () => {
  return (
    <>
      <div className="foot-left-row foot">
        <div className="foot-left-col">
          <h4>PAGES</h4>
          <ul className="foot-list">
            <li>
              <NavLink to={"/"}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Contact Us</NavLink>
            </li>
            <li>
              <NavLink to={"/account"}>My Account</NavLink>
            </li>
            <li>
              <NavLink to={"/shop"}>Shop</NavLink>
            </li>
            <li>
              <NavLink to={"/wishlist"}>Wishlist</NavLink>
            </li>
            <li>
              <NavLink to={"/terms-and-conditions"}>
                Terms and Conditions
              </NavLink>
            </li>
            <li>
              <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
