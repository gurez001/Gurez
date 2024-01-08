import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";
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
import "./updateproduct.css";
import { Helmet } from "react-helmet";
import { CharCount } from "../../../layout/CharCount/CharCount";
import { ProductSidebar } from "../createproduct/ProductSidebar";
import MetaData from "../../../layout/metaData/MetaData";
import ProductUpdateForm from "../productUpdateform/ProductUpdateForm";
import ImageTabToggle from "../../ImageGellery/uploadimage/ImageTabToggle";
import {
  clearErrors,
  getAllImages,
} from "../../../../actions/imageGelleryAction";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [oldImage, setOldImage] = useState([]);
  //-----------urlParams
  const { id } = useParams();

  // //--------------handleImageClickOpen

  const handleImageClickOpen = () => {
    setOpen(true);
    dispatch(getAllImages());
  };

  //----------------handleImageClickClose

  const handleImageClickClose = () => {
    setOpen(false);
  };

  const { error: updateError, isUpdate } = useSelector(
    (state) => state.adminProduct
  );
  const { error: imageError, images } = useSelector(
    (state) => state.selectedImages
  );
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  //-------------usestate
  const [article, setArticle] = useState("");
  const [description, setDescription] = useState("");
  const [currentImageData, setCurrentImageData] = useState("");
  const [inputValue, setinputValue] = useState({
    name: "",
    price: "",
    maxprice: "",
    parent: "",
    stock: "",
    metatitle: "",
    keyword: "",
    metalink: "",
    metadec: "",
  });

  const getCurrentImage = () => {
    const imageIds = images && images.map((item) => item._id);
    const oldIds = oldImage && oldImage.map((item) => item._id);
    if (imageIds && imageIds.length !== 0) {
      return imageIds;
    } else {
      return oldIds;
    }
  };

  const currentImageArray = getCurrentImage();

  const changeInputHandel = (e) => {
    const { name, value } = e.target;
    setinputValue({ ...inputValue, [name]: value });
  };

  const createProduct = (e) => {
    e.preventDefault();

    const {
      name,
      price,
      maxprice,
      parent,
      stock,
      metatitle,
      keyword,
      metalink,
      metadec,
    } = inputValue;
    let metaUrl = metalink.split(" ").join("-").toLowerCase();

    // if (
    //   name.trim() === "" ||
    //   price.trim() === "" ||
    //   maxprice.trim() === "" ||
    //   parent.trim() === "" ||
    //   stock.trim() === "" ||
    //   metatitle.trim() === "" ||
    //   keyword.trim() === "" ||
    //   metalink.trim() === "" ||
    //   metadec.trim() === "" ||
    //   article.trim() === "" ||
    //   (description.trim() === "" || (currentImageArray ?? []).length) === 0
    // ) {
    //   return alert.error(
    //     "Please fill out all required fields and upload at least one image. "
    //   );
    // }

    const productData = {
      name,
      price,
      maxprice,
      description,
      article,
      parent,
      stock,
      metatitle,
      keyword,
      metaUrl,
      metadec,
      currentImageArray,
    };

    dispatch(updateAdminProduct(id, productData));
  };

  useMemo(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id), []);
    }
  }, []);

  useEffect(() => {
    if (product) {
      setinputValue({
        name: product && product.name,
        price: product && product.price,
        maxprice: product && product.maxprice,
        stock: product && product.stock,
        parent: product && product.category && product.category._id,
        metatitle: product.seo && product.seo[0].metatitle,
        keyword: product.seo && product.seo[0].keyword,
        metalink: product.seo && product.seo[0].metalink,
        metadec: product.seo && product.seo[0].metadec,
      });
      setOldImage(product && product.imageId);
      setArticle(product && product.article);
      setDescription(product && product.description);
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(ClearError());
    }
    if (imageError) {
      alert.error(imageError);
      dispatch(clearErrors());
    }
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (isUpdate) {
      alert.success("product updated");
      Navigate("/admin/all-products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    alert,
    updateError,
    imageError,
    product,
    isUpdate,
    Navigate,
    id,
    error,
    dispatch,
  ]);

  return (
    <>
      <MetaData
        title={"Admin updat product list"}
        content={"Admin updat product list"}
        keywords={"Admin updat product list"}
      />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>Update Listing</h1>
                    </div>

                    <div className="create-page-contaionr">
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <div>
                            <ProductUpdateForm
                              inputValue={inputValue}
                              changeInputHandel={changeInputHandel}
                              article={article}
                              setArticle={setArticle}
                              description={description}
                              setDescription={setDescription}
                              createProduct={createProduct}
                            />
                          </div>
                          <div className="product-sidebar-containor">
                            <Button
                              variant="outlined"
                              onClick={handleImageClickOpen}
                            >
                              Image upload
                            </Button>
                            <ImageTabToggle
                              open={open}
                              close={handleImageClickClose}
                            />
                            <ProductSidebar
                              selectedImage={oldImage && oldImage}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
