import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import {
  ClearError,
  GetBlogCategory,
} from "../../../actions/BlogCategoryAction";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Blog.css";

const BlogCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, category, error } = useSelector(
    (state) => state.allBlogCategory
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(GetBlogCategory());
  }, [dispatch, alert, error]);
  return (
    <>
      {category && category.map((item, i) => (
        <div className="right-category" key={i}>
          <NavLink to={`${item.slug}`}>
            <p>{item.name}</p>
          </NavLink>
        </div>
      ))}
    </>
  );
};

export default BlogCategory;
