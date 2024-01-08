import React from "react";

const SinglePageArticle = ({ product }) => {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: product && product.article,
        }}
      />
    </>
  );
};

export default SinglePageArticle;
