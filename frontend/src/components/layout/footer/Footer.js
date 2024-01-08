import React from "react";
import { FootLeft } from "./assets/FootLeft";
import { FootMid } from "./assets/FootMid";
import { FootRight } from "./assets/FootRight";
import "./style.css";

export const Footer = () => {
  return (
    <footer>
      <div className="foot-col">
        <FootLeft />
        <FootMid />
        <FootRight />
      </div>
    </footer>
  );
};
