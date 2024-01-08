import { Button } from "@material-ui/core";
import React, { useState } from "react";

function ApplyCoupen({ setCoupon, setCouponValid, subtotal, setDiscounted }) {
  const [data, setData] = useState("");
  const validCoupon = ["g15", "welcome10"];

  const inputData = () => {
    if (validCoupon.includes(data)) {
      // Check if entered data is in validCoupons array
      setCouponValid("Coupon successfully applied");
      if (data === "g15") {
        // Apply 15% discount for 'g15' coupon
        const discountedSubtotal = (subtotal * 15) / 100;
        setCoupon(data);
        setDiscounted(discountedSubtotal);
        setData("");
      }
    } else {
      setCouponValid("Coupon not valid");
      setCoupon(false);
      setDiscounted(0);
    }
  };

  return (
    <>
      <div className="apply-coupon">
        <input
          type="text"
          value={data}
          placeholder="Enter coulpen code"
          onChange={(e) => setData(e.target.value)}
        />
        <Button onClick={inputData}>Apply coupon</Button>
      </div>
    </>
  );
}

export default ApplyCoupen;
