import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ClearError, GetBlogPost } from '../../../actions/BlogPostAction';
import { useAlert } from 'react-alert';
import { NavLink, useParams } from "react-router-dom";
import TimeAndDate from '../../layout/time/TimeAndDate';
import BlogPostCards from './BlogPostCards';
import BlogCategory from './BlogCategory';

function Blog() {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, blog, error } = useSelector(state => state.allBlog)


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(ClearError())

        }
        dispatch(GetBlogPost())

    }, [dispatch, alert, error])
    return (
        <>
            <div className='cont-area-h'>
                <div className='cont-row'>
                    <div className='blog-left'>
                        <div className='blog-row'>
                            {
                                blog.map((item, i) => (
                                    <div key={i} className='blog-post'>
                                        {/* <NavLink  to={`/blog/${item.slug}`}> */}
                                        <BlogPostCards item={item} />
                                        {/* </NavLink> */}
                                    </div>
                                ))
                            }
                        </div></div>
                <div className='blog-right'>
                    <div className='right-row'>
                        <h2>Blog category</h2>
                        <BlogCategory />

                    </div>

                </div>
            </div></div>
        </>
    )
}

export default Blog