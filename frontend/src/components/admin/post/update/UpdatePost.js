import React, { useEffect } from "react";
import { Aside } from "../../aside/Aside";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { GetBlogCategory } from "../../../../actions/BlogCategoryAction";
import { useParams } from "react-router-dom";
import { singleBlogPost } from "../../../../actions/BlogPostAction";


const UpdatePost = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams();
  useEffect(() => {

    dispatch(GetBlogCategory());
    dispatch(singleBlogPost(id))
  }, [dispatch,id]);

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
