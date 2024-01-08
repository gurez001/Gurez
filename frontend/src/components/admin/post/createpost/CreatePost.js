import React, { useState } from "react";
import { Aside } from "../../aside/Aside";
import "./CreatePost.css";
import MyEditor from "../../../layout/classiceditor/MyEditor";
import MetaData from "../../../layout/metaData/MetaData";
import { CharCount } from "../../../layout/CharCount/CharCount";
import { Button } from "@material-ui/core";


function CreatePost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [coupen, setCoupen] = useState(false);
  const [inputValue, setinputValue] = useState({
    
    //  description: "",
    category: "",
    metatitle: "",
    keywords: [],
    metalink: "",
    metadec: "",
  });
  const contentHeandle = (e) => {
    setContent(e);
  };
  const createProductInputHandle=()=>{

  }

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
                  <input
                    type="text"
                    placeholder="Add Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <div className="input-field-area">
                    <label htmlFor="description">description</label>

                    <div>
                      <MyEditor event={contentHeandle} />
                    </div>
                  </div>
                  <div className="post-anc">
                    <div className="post-category">
                      <h3>All Category</h3>
                      <input
                        type="checkbox"
                        name="coupen"
                        onChange={(e) => setCoupen(e.target.checked)}
                      />

                      <label for="coupen">Coupen</label>

                      <br />

                      <input type="checkbox" name="coupen" />

                      <label for="Packing Materials">Packing Materials</label>

                      <br />
                      <input type="checkbox" name="coupen" />

                      <label for="Pet Products">Pet Products</label>

                      <br />
                    </div>
                    <div className="post-tag">
                      <h3>Tags</h3>
                      <input type="checkbox" name="coupen" />

                      <label for="Corrugated Box">Corrugated Box</label>

                      <br />
                      <input type="checkbox" name="coupen" />

                      <label for="Packing">Packing</label>

                      <br />
                      <input type="checkbox" name="coupen" />

                      <label for="Products">Products</label>

                      <br />
                    </div>
                  </div>
                  <h2>SEO</h2>
                              <div className="input-field-area">
                                <label htmlFor="keyword">Keyword</label>
                                <input
                                  type="text"
                                  name="keywords"
                                  autoComplete="off"
                                  id="keywords"
                                  value={inputValue.keywords}
                                  // onKeyDown={handleInputKeyDown}
                                  onChange={createProductInputHandle}
                                />
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="metatitle">Meta Title</label>
                                <input
                                  type="metatitle"
                                  name="metatitle"
                                  autoComplete="off"
                                  id="metatitle"
                                  value={inputValue.metatitle}
                                  onChange={createProductInputHandle}
                                />
                                <CharCount
                                  char={inputValue.metatitle}
                                  limit={60}
                                />
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="metalink">Meta link</label>
                                <input
                                  type="metalink"
                                  name="metalink"
                                  autoComplete="off"
                                  id="metalink"
                                  value={inputValue.metalink}
                                  onChange={createProductInputHandle}
                                />
                                <CharCount
                                  char={inputValue.metalink}
                                  limit={60}
                                />
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="metalink">Meta link</label>
                                <input
                                  type="metalink"
                                  name="metalink"
                                  autoComplete="off"
                                  id="metalink"
                                  value={inputValue.metalink}
                                  onChange={createProductInputHandle}
                                />
                                <CharCount
                                  char={inputValue.metalink}
                                  limit={60}
                                />
                              </div>
                              <div className="input-field-area">
                                <label htmlFor="metadec">
                                  Meta description
                                </label>
                                <textarea
                                  type="metadec"
                                  name="metadec"
                                  autoComplete="off"
                                  id="metadec"
                                  value={inputValue.metadec}
                                  onChange={createProductInputHandle}
                                ></textarea>
                                <CharCount
                                  char={inputValue.metadec}
                                  limit={160}
                                />
                              </div>
                              <div>
                                <Button
                               className="post-btn"
                                  type="submit"
                                  value="Singup"
                                >
                                  Publish
                                </Button>
                              </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
