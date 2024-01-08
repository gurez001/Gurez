import React from "react";
import Logo from "../../header/assets/Logo";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa6";

export const FootLeft = () => {
  return (
    <>
      <div className="foot-left-row foot">
        <div className="foot-left-col">
          <div className="foot-logo">
            <Logo />
          </div>
          <div className="contacts">
            <p>For all orders related queries, kindly contact us at:</p>
            <NavLink to={"/"}>shop@winkycoo.com</NavLink>
            <p>
              Monday - Friday
              <br />
              10:00 AM to 7:00 PM
            </p>
            <p>
              Our Store Address:
              <br />
              #12, Second Floor, Khera Enclave, Sector 126, Kharar (Pb) - 140301
            </p>
            <div className="social-links">
              <p>Follow us on:</p>
              <div className="social-link-row">
                <NavLink to={"/"}>
                  <FaFacebook />
                </NavLink>
                <NavLink to={"/"}>
                  <FaInstagram />
                </NavLink>
                <NavLink to={"/"}>
                  <FaTwitter />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
