import React from "react";

const CreateSeo = ({ seoHandler, seoInputValue, submitHandler }) => {
  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <div className="input-field-area">
            <label>Title</label>
            <input
              type="text"
              value={seoInputValue.seotitle}
              onChange={(e) => seoHandler(e)}
              placeholder="Title"
              name="seotitle"
            />
          </div>
          <div className="input-field-area">
            <label>Keyword</label>
            <input
              type="text"
              onChange={(e) => seoHandler(e)}
              placeholder="keyword"
              value={seoInputValue.keyword}
              name="keyword"
            />
          </div>
          <div className="input-field-area">
            <label>Descrription</label>
            <input
              type="text"
              onChange={(e) => seoHandler(e)}
              placeholder="metadec"
              value={seoInputValue.metadec}
              name="metadec"
            />
          </div>
          <div className="input-field-area">
            <label>Meta link</label>
            <input
              type="text"
              onChange={(e) => seoHandler(e)}
              placeholder="metalink"
              value={seoInputValue.metalink}
              name="metalink"
              readOnly
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSeo;
