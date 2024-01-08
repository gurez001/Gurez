import React from "react";
import { NavList } from "./NavList";
import { Search } from "./Search";
import { FaXmark } from "react-icons/fa6";
import CallAction from "./CallAction";
import Cart from "./Cart";
import { Wishlist } from "./Wishlist";

export const MobNav = ({ isContentVisible, toggleContentRemove }) => {
  return (
    <>
      {/* <div className="nav-mob-action">
        <div className="nav-mob-action-col">
          <CallAction />
          <div className="mob-wish">
            <Wishlist />
          </div>
          <div className="mob-cart">
            <Cart />
          </div>
        </div>
      </div> */}
      <div
        id={isContentVisible === true ? "nav-trans" : "no-trans"}
        className="mob-nav"
      >
        <div className="mob-call">
          <div className="hab-remove">
            <FaXmark onClick={toggleContentRemove} />
          </div>
          <Search />
          <NavList toggleContentRemove={toggleContentRemove} />
        </div>
      </div>
    </>
  );
};
