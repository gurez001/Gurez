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
import CreateSeo from "../../seo/create/CreateSeo";

const ProductForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();

  const { loding, error, success } = useSelector((state) => state.newProduct);
  const { images } = useSelector((state) => state.selectedImages);

  const [inputValue, setinputValue] = useState({
    parent: "",
  });
  const [seoInputValue, setSeoInputValue] = useState({
    seotitle: "",
    keyword: "",
    metadec: "",
    metalink: "",
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

  const seoHandler = (e) => {
    const { name, value } = e.target;

    setSeoInputValue({ ...seoInputValue, [name]: value });
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const parent = inputValue.parent;
  const [slug, setSlug] = useState("");
  const [article, setArticle] = useState("");
  const [content, setContent] = useState("");

  const createProduct = (e) => {
    e.preventDefault();
    const imageIds = images && images.map((item) => item._id);
    if (!seoInputValue) {
      return alert.error("seoInputValue is undefined or null");
    }
    const {
      seotitle,
      keyword: seokeyword,
      metadec: seometadec,
      metalink: seometalink,
    } = seoInputValue;

    if (
      name.trim() === "" ||
      slug.trim() === "" ||
      price.trim() === "" ||
      maxPrice.trim() === "" ||
      parent.trim() === "" ||
      stock.trim() === "" ||
      article.trim() === "" ||
      content.trim() === "" ||
      seotitle.trim() === "" ||
      seokeyword.trim() === "" ||
      seometadec.trim() === "" ||
      seometalink.trim() === "" ||
      (imageIds ?? []).length === 0
    ) {
      return alert.error(
        "Please fill out all required fields and upload at least one image. "
      );
    }

    dispatch(
      createNewProduct(
        name,
        slug,
        price,
        maxPrice,
        content,
        article,
        parent,
        imageIds,
        stock,
        seotitle,
        seometadec,
        seokeyword,
        seometalink
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
    if (name) {
      setSeoInputValue((prev) => ({ ...prev, seotitle: name }));
    }
    if (slug) {
      setSeoInputValue((prev) => ({ ...prev, metalink: slug }));
    }
  }, [alert, error, dispatch, success, Navigate, name, slug]);

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
            <div className="input-field-area">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                name="slug"
                onBlur={(e) => setSlug(e.target.value)}
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
          <h2>Product SEO</h2>
            <CreateSeo
              seoInputValue={seoInputValue}
              seoHandler={seoHandler}
              submitHandler={createProduct}
            />
        </>
      )}
    </>
  );
};

export default ProductForm;
