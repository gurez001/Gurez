import React, { useState } from 'react';
import { Aside } from '../../aside/Aside';
import { NavLink } from 'react-router-dom';
import './AllPost.css';
import CreatePost from '../createpost/CreatePost';



function AllPost() {
  const [action,setAction]=useState("");
  const [tarik,setTarik]=useState("");
  const [catego,setCatego]=useState("");
  const [sear,setSear]=useState("");
  return (
   <>
    <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
               
            <div className='all-post'>
              <h2>Posts <span><NavLink to="/admin/post/add-new-post">Add New</NavLink></span></h2>
            <div className='allpost-filter'>
              <div className='first-filter'>
                <select value={action} onChange={(e)=>setAction(e.target.value)}>
                  <option>Bulk Action</option>
                  <option value="Edit">Edit</option>
                  <option value="Move To Trash">Move To Trash</option>
                </select>
                <button>Apply</button>
              </div>
              <div className='sec-filter'>
                <select value={tarik} onCanPlay={setTarik}>
                  <option>All Date</option>
                  <option Value="december 2023">December 2023</option>
                  <option Value="August 2023">August 2023</option>
                </select>
                <select value={catego} onChange={setCatego}>
                  <option>All categories</option>
                  <option value="Coupen">Coupen</option>
                  <option value="Packiong Material">Packing material</option>
                  <option value="Pet Products">Pet Product</option>
                </select>
                <button>Filter</button>
              </div>
              <div className='search-filter'>
                <input type='text' placeholder='Search Post' value={sear} onChange={(e)=>setSear(e.target.value)} />
                <button type='search'>Search</button>
              </div>
            </div>
            <div className='post-table'>
              <table id="table">  
                <thead>
                  <tr>
                   
                    <th><span><input type='checkbox' /></span>Title</th>
                    <th>Author</th>
                    <th>categories</th>
                    <th>Tag</th>
                    <th>Comments</th>
                    <th>Date</th>
                  </tr>
                  <tr>
                   
                   <td><span><input type='checkbox' /></span>title</td>
                   <td>Author</td>
                   <td>categories</td>
                   <td>Tag</td>
                   <td>Comments</td>
                   <td>Date</td>
                 </tr>
                </thead>
              </table>
            </div>
            </div>
                  
              </section>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default AllPost
