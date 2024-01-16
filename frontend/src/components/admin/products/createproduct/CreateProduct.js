import React, { useState } from "react";
import { Aside } from "../../aside/Aside";
import { Button } from "@material-ui/core";
import ImgUploader from "../../ImageGellery/uploadimage/ImageTabToggle";
import { ProductSidebar } from "./ProductSidebar";
import MetaData from "../../../layout/metaData/MetaData";
import ProductForm from "../productform/ProductForm";
import {useDispatch} from'react-redux';
import { getAllImages } from "../../../../actions/imageGelleryAction";

export const CreateProduct = () => {
  
  const [open, setOpen] = useState(false);
const dispatch = useDispatch();
  //--------------handleImageClickOpen
  const handleImageClickOpen = () => {
    setOpen(true);
    dispatch(getAllImages());
  };
  //----------------handleImageClickClose

  const handleImageClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MetaData
        title={"Admin create product list"}
        content={"Admin create product list"}
        keywords={"Admin create product list"}
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
                      <h1>Create List</h1>
                    </div>

                    <div className="create-page-contaionr">
                      <div className="from-contaionr">
                        <ProductForm />
                      </div>
                      <div className="product-sidebar-containor">
                        <Button
                          variant="outlined"
                          onClick={handleImageClickOpen}
                        >
                          Image upload
                        </Button>
                        <ImgUploader
                          open={open}
                          close={handleImageClickClose}
                        />
                        <ProductSidebar />
                      </div>
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
export default CreateProduct;