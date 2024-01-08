import React, { useEffect, useState } from "react";
import {
  clearErrors,
  imagePrimary,
} from "../../../../actions/imageGelleryAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

export const ProductSidebar = ({ selectedImage }) => {
  const [checkPrimary, setcheckPrimary] = useState("");
  const [isVisibal, setIsVisibal] = useState(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { images, error } = useSelector((state) => state.selectedImages);

  const handlePrimary = (item, i) => {
    setIsVisibal(i);
    setcheckPrimary(item._id);
    dispatch(imagePrimary(item._id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);
console.log(selectedImage)
  return (
    <>
      {images
        ? images &&
          images.map((item, i) => (
            <div
              onClick={() => {
                handlePrimary(item);
              }}
              key={i}
            >
              <p>{item._id === checkPrimary ? "Primary" : null}</p>
              {item._id === checkPrimary ? (
                <img src={`http://localhost:8000/${item.path}`} alt="jgjg" />
              ) : null}
            </div>
          ))
        : selectedImage &&
          selectedImage.map((item, i) => (
            <div
              onClick={() => {
                handlePrimary(item);
              }}
              key={i}
            >
              <p>{item._id === checkPrimary ? "Primary" : null}</p>
              {item._id === checkPrimary ? (
                <img src={`http://localhost:8000/${item.path}`} alt="jgjg" />
              ) : null}
            </div>
          ))}

      <div className="non-Primary-containor">
        {images
          ? images &&
            images.map((item, i) => (
              <div
                className={isVisibal === i ? "non-Primary-inactive" : null}
                onClick={() => {
                  handlePrimary(item, i);
                }}
                key={i}
              >
                <p>{item._id !== checkPrimary ? "Make it Primary" : null}</p>
                {item._id !== checkPrimary ? (
                  <img src={`http://localhost:8000/${item.path}`} alt="jgjg" />
                ) : null}
              </div>
            ))
          : selectedImage &&
            selectedImage.map((item, i) => (
              <div
                className={isVisibal === i ? "non-Primary-inactive" : null}
                onClick={() => {
                  handlePrimary(item, i);
                }}
                key={i}
              >
                <p>{item._id !== checkPrimary ? "Make it Primary" : null}</p>
                {item._id !== checkPrimary ? (
                  <img src={`http://localhost:8000/${item.path}`} alt="jgjg" />
                ) : null}
              </div>
            ))}
      </div>
    </>
  );
};
export default ProductSidebar;