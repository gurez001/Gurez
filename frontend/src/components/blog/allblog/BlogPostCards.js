import React from "react";
import TimeAndDate from "../../layout/time/TimeAndDate";
import { NavLink } from "react-router-dom";
import "./Blog.css";

const BlogPostCards = ({ item }) => {
  return (
    <>
      <div className="blog-inner">
        <img src="https://gurez.com/wp-content/uploads/2023/05/Amazone-tape-3-600x600.webp" />
        <div className="blog-text">
          <NavLink to={`/blog/${item.slug}`}>
            <h2>{item.title}</h2>
          </NavLink>
          <p style={{ fontWeight: 500 }}>
            <TimeAndDate time={item.creditAt} />{" "}
            <span style={{ float: "right" }}>
              {item.category && item.category.name}
            </span>
          </p>
          <p className="blog-article">{item.article}</p>
          <a href={`/blog/${item.slug}`}>Read More</a>
        </div>
      </div>
    </>
  );
};

export default BlogPostCards;
