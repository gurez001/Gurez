import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  ClearError,
  getProductDetails,
  updateAdminProduct,
} from "../../../../actions/ProductAction";
import { UPDATE_PRODUCT_RESET } from "../../../../constants/ProductConstants";

import Loader from "../../../layout/loader/Loader";
// import "./updateproduct.css";
import { Helmet } from "react-helmet";
import { CharCount } from "../../../layout/CharCount/CharCount";

import ImgUploader from "../../ImageGellery/uploadimage/ImageTabToggle";
import {
  SET_SELECTED_IMAGE_RESET,
  UPDATE_IMAGE_RESET,
} from "../../../../constants/imageGelleryCartConstants";
import SelectCategore from "../../category/allCategory/assets/SelectCategore";
import MyEditor from "./classiceditor/MyEditor";
const ProductUpdateForm = ({
  inputValue,
  changeInputHandel,
  article,
  setArticle,
  description,
  setDescription,
  createProduct
}) => {
  console.log(inputValue.parent)
  return (
    
        <>
          <form
            className="product-form"
            onSubmit={createProduct}
            encType="multipart/from-data"
          >
            <div className="input-field-area">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name-input"
                value={inputValue.name || ""}
                onChange={changeInputHandel}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="price">price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={inputValue.price || ""}
                onChange={changeInputHandel}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="maxprice">Max price</label>
              <input
                type="number"
                name="maxprice"
                id="maxprice"
                value={inputValue.maxprice || ""}
                onChange={changeInputHandel}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={inputValue.stock || ""}
                onChange={changeInputHandel}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="category">category</label>
              <SelectCategore
                parent={inputValue.parent || ""}
                handelInputValue={changeInputHandel}
              />
            </div>

            <div className="input-field-area">
              <label htmlFor="description">description</label>

              <div>
                <MyEditor valuedata={description} getData={setDescription} />
              </div>
            </div>
            <div className="input-field-area">
              <label htmlFor="article ">Article </label>

              <div>
                <MyEditor valuedata={article} getData={setArticle} />
              </div>
            </div>
            <h2>SEO</h2>
            <div className="input-field-area">
              <label htmlFor="keyword">Keyword</label>
              <input
                type="text"
                name="keywords"
                autoComplete="off"
                id="keywords"
                value={inputValue.keyword || ""}
                onChange={changeInputHandel}
              />
            </div>
            <div className="input-field-area">
              <label htmlFor="metatitle">Meta Title</label>
              <input
                type="metatitle"
                name="metatitle"
                autoComplete="off"
                id="metatitle"
                value={inputValue.metatitle || ""}
                onChange={changeInputHandel}
              />
              {/* <CharCount char={metatitle} limit={60} /> */}
            </div>
            <div className="input-field-area">
              <label htmlFor="metalink">Meta link</label>
              <input
                type="metalink"
                name="metalink"
                autoComplete="off"
                id="metalink"
                value={inputValue.metalink || ""}
                onChange={changeInputHandel}
              />
              {/* <CharCount char={metalink} limit={60} /> */}
            </div>
            <div className="input-field-area">
              <label htmlFor="metadec">Meta description</label>
              <textarea
                type="metadec"
                name="metadec"
                autoComplete="off"
                id="metadec"
                value={inputValue.metadec || ""}
                onChange={changeInputHandel}
              ></textarea>
              {/* <CharCount char={metadec} limit={160} /> */}
            </div>
            <div>
              <Button
                // disabled={loding || btndisable ? true : false}
                type="submit"
                value="Singup"
              >
                Create list
              </Button>
            </div>
          </form>
        </>
     
  );
};

export default ProductUpdateForm;
