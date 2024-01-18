import React, { useState } from "react";
import { Aside } from "../../aside/Aside";
import SelectCategore from "../allCategory/assets/SelectCategore";
import CreateSeo from "../../seo/create/CreateSeo";
import { Button } from "@material-ui/core";

const UpdateSubCategory = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    parent: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="ad-section">
                {/* {loading && updateLoading ? (
                <Loader />
              ) : (
                <> */}
                <div className="all-products-cont">
                  <div>
                    <form
                    //</div> onSubmit={submitHandler}
                    >
                      <div className="input-field-area">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={inputValue.name}
                          // onChange={handelInputValue}
                        />
                      </div>
                      <div className="input-field-area">
                        <label htmlFor="slug">Slug</label>
                        <input
                          type="text"
                          name="slug"
                          value={inputValue.slug}
                          // onChange={handelInputValue}
                        />
                      </div>
                      <div className="input-field-area">
                        <label htmlFor="parent">Parent category</label>
                        <SelectCategore
                          parent={inputValue.parent}
                          //   handelInputValue={handelInputValue}
                        />
                      </div>
                      <div className="input-field-area">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={inputValue.title}
                          //onChange={handelInputValue}
                        />
                      </div>
                      <div className="input-field-area">
                        <label htmlFor="description">Description</label>
                        <input
                          type="text"
                          name="description"
                          value={inputValue.description}
                          //onChange={handelInputValue}
                        />
                      </div>
                      <div>
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <CreateSeo
                //   seoInputValue={seoInputValue}
                //   seoHandler={seoHandler}
                //   submitHandler={submitHandler}
                /> */}
                {/* </>
              )} */}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSubCategory;
