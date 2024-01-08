import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import the default styles
import LazyLoadImages from "../../layout/lazyload/LazyLoadImages";

const ImageLightbox = ({ images }) => {

  return (
    <>
      <ul>
        {images &&
          images.map((item, i) => (
            <li key={i} 
        //    onClick={() => imgSlideFun(i)}
            >
              <LazyLoadImages product={item} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default ImageLightbox;
