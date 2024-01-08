import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllImages,
  getImageId,
} from "../../../../actions/imageGelleryAction";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

import MetaData from "../../../layout/metaData/MetaData";
import { Aside } from "../../aside/Aside";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import "./allImage.css";
import { NavLink } from "react-router-dom";
import Loader from "../../../layout/loader/Loader";
import ImageGallery from "./ImageGallery";

const AllImages = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, images, resultPerPage, imageCount, error } = useSelector(
    (state) => state.images
  );

  const [selectAll, setSelectAll] = useState(false);




  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };
  useEffect(() => {
    dispatch(getAllImages());
  }, []);

  return (
    <>
      <MetaData
        title={"Admin all images"}
        content={"Admin all images"}
        keywords={"Admin all images"}
      />

      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <div className="all-img-cont-containor">
                <section className="ad-section">
                  <div className="all-img-cont">
                    <div className="admin-img-title">
                      <div className="gallery-header">
                        <div className="page-title-action">
                          <NavLink to={"/admin/upload/media-new"}>
                            Add New Media File
                          </NavLink>
                        </div>
                        <h1>Image Gellery</h1>
                      </div>
                      {/* <p>No of media {images && images.length}</p> */}

                      <div className="gallery-containor">
                        <div>
                          <p>
                            <button onClick={toggleSelectAll}>
                              Toggle Select All
                            </button>
                          </p>
                        </div>

                        <ImageGallery />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllImages;
