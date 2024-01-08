import React from "react";
import { Aside } from "../../aside/Aside";
import CategoreForm from "../allCategory/assets/CategoreForm";
const UpdateCategory = () => {
  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <div className="all-products-cont"><CategoreForm/></div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
