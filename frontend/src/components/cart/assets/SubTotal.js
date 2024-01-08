import React from "react";

export const SubTotal = ({ item, quantity }) => {
  return (
    <>
      <div className="sub-total">
        <p>₹{item * quantity}</p>
      </div>
    </>
  );
};
