import React, { useEffect, useState } from "react";
import MyEditor from "../../../layout/classiceditor/MyEditor";
import SelectCategore from "../../category/allCategory/assets/SelectCategore";
import { Button } from "@material-ui/core";
import { CharCount } from "../../../layout/CharCount/CharCount";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ClearError,
  createNewProduct,
} from "../../../../actions/ProductAction";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../../../constants/ProductConstants";
import Loader from "../../../layout/loader/Loader";

const ProductForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loding, error, success } = useSelector((state) => state.newProduct);
  const { images } = useSelector((state) => state.selectedImages);

  const [inputValue, setinputValue] = useState({
    parent: "",
  });

  //----------editor event

  const contentHeandle = (e) => {
    setContent(e);
  };

  //----------article editor event--
  const articleContentHeandle = (e) => {
    setArticle(e);
  };

  const createProductInputHandle = (e) => {
    const { name, value } = e.target;
    setinputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const parent = inputValue.parent;
  const [metalink, setMetalink] = useState("");
  const [metadec, setMetadec] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [metatitle, setMetatitle] = useState("");
  const [article, setArticle] = useState("");
  const [content, setContent] = useState("");

  const createProduct = (e) => {
    e.preventDefault();
    const imageIds = images && images.map((item) => item._id);
    if (
      name.trim() === "" ||
      price.trim() === "" ||
      maxPrice.trim() === "" ||
      parent.trim() === "" ||
      stock.trim() === "" ||
      metatitle.trim() === "" ||
      keywords.trim() === "" ||
      metalink.trim() === "" ||
      metadec.trim() === "" ||
      article.trim() === "" ||
      content.trim() === "" ||
      (imageIds ?? []).length === 0
    ) {
      return alert.error(
        "Please fill out all required fields and upload at least one image. "
      );
    }
    let metaUrl = metalink.split(" ").join("-").toLowerCase();

    dispatch(
      createNewProduct(
        name,
        price,
        maxPrice,
        content,
        article,
        parent,
        imageIds,
        stock,
        metatitle,
        keywords,
        metaUrl,
        metadec
      )
    );
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      dispatch({ type: NEW_PRODUCT_RESET });
      alert.success("product created");
      Navigate("/admin/all-products");
    }
  }, [alert, error, dispatch, success, Navigate]);
  return (
    <>
      {loding ? (
        <Loader />
      ) : (
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
                onBlur={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="price">price</label>
              <input
                type="number"
                name="price"
                id="price"
                onBlur={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="maxprice">Max price</label>
              <input
                type="number"
                name="maxprice"
                id="maxpricee"
                onBlur={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                id="stock"
                onBlur={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="category">category</label>
              <SelectCategore
                parent={inputValue.parent}
                handelInputValue={createProductInputHandle}
              />
            </div>

            <div className="input-field-area">
              <label htmlFor="description">description</label>

              <div>
                <MyEditor
                  valueData={inputValue.description}
                  event={contentHeandle}
                />
              </div>
            </div>
            <div className="input-field-area">
              <label htmlFor="article ">Article </label>

              <div>
                <MyEditor
                  valueData={inputValue.article}
                  event={articleContentHeandle}
                />
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
                // onKeyDown={handleInputKeyDown}
                onBlur={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div className="input-field-area">
              <label htmlFor="metatitle">Meta Title</label>
              <input
                type="metatitle"
                name="metatitle"
                autoComplete="off"
                id="metatitle"
                onBlur={(e) => setMetatitle(e.target.value)}
              />
              <CharCount char={metatitle} limit={60} />
            </div>
            <div className="input-field-area">
              <label htmlFor="metalink">Meta link</label>
              <input
                type="metalink"
                name="metalink"
                autoComplete="off"
                id="metalink"
                onBlur={(e) => setMetalink(e.target.value)}
              />
              <CharCount char={metalink} limit={60} />
            </div>
            <div className="input-field-area">
              <label htmlFor="metadec">Meta description</label>
              <textarea
                type="metadec"
                name="metadec"
                autoComplete="off"
                id="metadec"
                onBlur={(e) => setMetadec(e.target.value)}
              ></textarea>
              <CharCount char={metadec} limit={160} />
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
      )}
    </>
  );
};

export default ProductForm;
