import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";
import CategoreForm from "../allCategory/assets/CategoreForm";
import CreateSeo from "../../seo/create/CreateSeo";
import { Button } from "@material-ui/core";
import SelectCategore from "../allCategory/assets/SelectCategore";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getSingleParentCat,
  updateParentCategory,
} from "../../../../actions/CategoreAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../../layout/loader/Loader";
import { UPDATE_PARENT_CATEGORIE_RESET } from "../../../../constants/CategoreConstants";

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const Navigate = useNavigate();
  const {
    loading: updateLoading,
    isUpdate,
    error: UpdateError,
  } = useSelector((state) => state.adminUpdateParentCategory);
  const { loading, parent, error } = useSelector(
    (state) => state.adminSingleCategory
  );

  const [seoInputValue, setSeoInputValue] = useState({
    seotitle: "",
    keyword: "",
    metadec: "",
    metalink: "",
  });

  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    parent: "",
    title: "",
    description: "",
  });

  // console.log(inputValue,seoInputValue)

  const handelInputValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const seoHandler = (e) => {
    const { name, value } = e.target;

    setSeoInputValue({ ...seoInputValue, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { seotitle, keyword, metadec, metalink } = seoInputValue;
    const { name, slug, title, description, parent } = inputValue;
    dispatch(
      updateParentCategory(
        id,
        name,
        slug,
        title,
        description,
        parent,
        seotitle,
        keyword,
        metadec,
        metalink
      )
    );
    // dispatch(CreateNewCategore(name, slug, title, parent, description,seotitle,
    //   keyword,
    //   metadec,));
  };

  useMemo(() => {
    // if (parent && parent._id !== id) {
    dispatch(getSingleParentCat(id));
    // }
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (UpdateError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdate) {
      alert.success("Parent category successfully updated");
      dispatch({ type: UPDATE_PARENT_CATEGORIE_RESET });
      Navigate("/admin/categorie/");
    }

    if (inputValue.title) {
      setSeoInputValue((prev) => ({ ...prev, seotitle: inputValue.title }));
    }
    if (inputValue.slug) {
      setSeoInputValue((prev) => ({ ...prev, metalink: inputValue.slug }));
    }
    if (parent) {
      setInputValue({
        name: parent && parent.name,
        slug: parent && parent.slug,
        parent: parent && parent._id,
        title: parent && parent.title,
        description: parent && parent.description,
      });

      setSeoInputValue({
        seotitle: parent && parent.seo && parent.seo.metatitle,
        keyword: parent && parent.seo && parent.seo.keyword,
        metadec: parent && parent.seo && parent.seo.metadec,
        metalink: parent && parent.seo && parent.seo.metalink,
      });
    }
  }, [
    id,
    inputValue.title,
    inputValue.slug,
    parent && parent,
    error,
    alert,
    dispatch,
    UpdateError,
    isUpdate,
  ]);

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                {loading && updateLoading ? (
                  <Loader />
                ) : (
                  <>
                    <div className="all-products-cont">
                      <div>
                        <form onSubmit={submitHandler}>
                          <div className="input-field-area">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              value={inputValue.name}
                              name="name"
                              onChange={handelInputValue}
                            />
                          </div>
                          <div className="input-field-area">
                            <label htmlFor="slug">Slug</label>
                            <input
                              type="text"
                              value={inputValue.slug}
                              name="slug"
                              onChange={handelInputValue}
                            />
                          </div>
                          <div className="input-field-area">
                            <label htmlFor="parent">Parent category</label>
                            <SelectCategore
                              parent={inputValue.parent}
                              handelInputValue={handelInputValue}
                            />
                          </div>
                          <div className="input-field-area">
                            <label htmlFor="title">Title</label>
                            <input
                              type="text"
                              name="title"
                              value={inputValue.title}
                              onChange={handelInputValue}
                            />
                          </div>
                          <div className="input-field-area">
                            <label htmlFor="description">Description</label>
                            <input
                              type="text"
                              name="description"
                              value={inputValue.description}
                              onChange={handelInputValue}
                            />
                          </div>
                          <div>
                            <Button type="submit">Submit</Button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <CreateSeo
                      seoInputValue={seoInputValue}
                      seoHandler={seoHandler}
                      submitHandler={submitHandler}
                    />
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
