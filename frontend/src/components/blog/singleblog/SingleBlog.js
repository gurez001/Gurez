import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleBlogPage,ClearError } from '../../../actions/BlogPostAction';
import { useParams } from 'react-router-dom';

 const SingleBlog = () => {
    const dispatch=useDispatch();
    const {id} = useParams();
    const alert=useAlert();
// console.log(id)
    // const [loading,singleblog,error]=useSelector(state=>state.SingleBlogPage);

    useEffect(()=>{
        // if(error){
        //     alert.error(error)
        //     dispatch(ClearError())
        // }
        dispatch(GetSingleBlogPage(id))
    },[dispatch,
        //alert,
        //error,
        id])

  return (
   <>
 <h2>single</h2>
   </>
  )
}
export default SingleBlog