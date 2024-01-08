import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  CreateNewCategore,
  clearErrors,
} from "../../../../../actions/CategoreAction";
import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import Loader from "../../../../layout/loader/Loader";
import { NEW_CATEGORIE_RESET } from "../../../../../constants/CategoreConstants";
import SelectCategore from "./SelectCategore";
const CategoreForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, success, message, error } = useSelector(
    (state) => state.adminCategore
  );
  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);
  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    parent: "",
    title: "",
    description: "",
  });

  const handelInputValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const { name, slug, title, description, parent } = inputValue;
    dispatch(CreateNewCategore(name, slug, title, parent, description));
    // checkParent();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      setInputValue({
        name: "",
        slug: "",
        title: "",
        parent: "",
        description: "",
      });
      alert.success("Categore successfuly created");
      dispatch({ type: NEW_CATEGORIE_RESET });
    }
  }, [alert, error, dispatch, message, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={submitHandler}>
            <div className="input-field-area">
              <label>Name</label>
              <input
                type="text"
                value={inputValue.name}
                name="name"
                onChange={handelInputValue}
              />
            </div>
            <div className="input-field-area">
              <label>Slug</label>
              <input
                type="text"
                value={inputValue.slug}
                name="slug"
                onChange={handelInputValue}
              />
            </div>
            <div className="input-field-area">
              <label>Parent category</label>
              <SelectCategore
                parent={inputValue.parent}
                handelInputValue={handelInputValue}
              />
            </div>
            <div className="input-field-area">
              <label>Title</label>
              <input
                type="text"
                value={inputValue.title}
                name="title"
                onChange={handelInputValue}
              />
            </div>
            <div className="input-field-area">
              <label>Description</label>
              <input
                type="text"
                value={inputValue.description}
                name="description"
                onChange={handelInputValue}
              />
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CategoreForm;
