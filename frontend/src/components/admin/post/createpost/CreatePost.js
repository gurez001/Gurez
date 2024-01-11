import React, { useEffect, useState } from "react";
import { Aside } from "../../aside/Aside";
import "./CreatePost.css";
import MyEditor from "../../../layout/classiceditor/MyEditor";
import MetaData from "../../../layout/metaData/MetaData";
import { CharCount } from "../../../layout/CharCount/CharCount";
import { Button } from "@material-ui/core";
import Categore from "./assets/Categore";
import { GetBlogCategory } from "../../../../actions/BlogCategoryAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ClearError, CreateBlogPost } from "../../../../actions/BlogPostAction";
import { useNavigate } from "react-router-dom";
import { CREATE_BLOG_POST_RESET } from "../../../../constants/BlogPostConstants";
import CreateSeo from "../../seo/create/CreateSeo";
import { createSeoAction, seoClearError } from "../../../../actions/SeoAction";

function CreatePost() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { loading, success, error } = useSelector(
    (state) => state.adminCreatePost
  );

  const {
    loading: seoLoading,
    success: seoSuccess,
    error: seoError,
  } = useSelector((state) => state.adminCreatePost);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setSescription] = useState("");
  const [slug, setSlug] = useState("");
  const [seoInputValue, setSeoInputValue] = useState({
    title: "",
    keyword: "",
    metadec: "",
    metalink: "",
  });
console.log(seoInputValue)
  const contentHeandle = (e) => {
    setSescription(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(seoInputValue)
    if (!seoInputValue) {
      return alert.error("seoInputValue is undefined or null");
    }
    const { title: seotitle, keyword, metadec, metalink } = seoInputValue;
    if (
      selectedCategoryId.trim() === "" ||
      title.trim() === "" ||
      description.trim() === "" ||
      slug.trim() === "" ||
      seotitle.trim() === "" ||
      keyword.trim() === "" ||
      metadec.trim() === "" ||
      metalink.trim() === ""
    ) {
      return alert.error("Please fill out all required fields.");
    }
    dispatch(CreateBlogPost(selectedCategoryId, title, description, slug));
    dispatch(createSeoAction(seotitle, keyword, metadec, metalink));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (seoError) {
      alert.error(error);
      dispatch(seoClearError());
    }
    if (success && seoSuccess) {
      alert.success("Product successfully created");
      Navigate("/admin/post/all-post");
      dispatch({ type: CREATE_BLOG_POST_RESET });
    }
    if (title) {
      setSeoInputValue({ title: title });
    }
    if (slug) {
      setSeoInputValue({ metalink: slug });
    }
    dispatch(GetBlogCategory());
  }, [dispatch, success, error, alert, title, slug, seoError, seoSuccess]);

  const seoHandler = (e) => {
    const { name, value } = e.target;

    setSeoInputValue({ ...seoInputValue, [name]: value });
  };

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                <h2>Add New Post</h2>
                <div className="post-tilte">
                  <form onSubmit={submitHandler}>
                    <div className="input-field-area">
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add Title"
                      />
                    </div>
                    <div className="input-field-area">
                      <label htmlFor="description">description</label>
                      <div>
                        <MyEditor event={contentHeandle} />
                      </div>
                    </div>

                    <div className="input-field-area">
                      <label htmlFor="slug">Slug</label>
                      <input
                        type="text"
                        placeholder="slug"
                        onChange={(e) => setSlug(e.target.value)}
                      />
                    </div>
                    <div>
                      <input type="submit" value={"Create post"} />
                    </div>
                  </form>
                </div>
                <CreateSeo
                  seoInputValue={seoInputValue}
                  seoHandler={seoHandler}
                  submitHandler={submitHandler}
                />
              </section>
            </div>

            <div>
              <Categore setSelectedCategoryId={setSelectedCategoryId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
