import React, { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
export const Confirmleft = ({ user }) => {

const disptch = useDispatch();
const {shippinginfo} = useSelector(state=>state.cart);

//   const [info, setInfo] = useState({
//     fullName: "",
//     email: "",
//     address: "",
//     city: "",
//     pinCode: "",
//     state: "",
//     country: "",
//     phoneNo: "",
//   });
// console.log(info)
//   useEffect(() => {
//     if (shippinginfo) {
//      // console.log(shippinginfo)
//       const {
//        fullName,
//         email,
//         address,
//         city,
//         pinCode,
//         state,
//         country,
//         phoneNo,
//       } = shippinginfo;
//       setInfo({
//         fullName:shippinginfo.fullName,
//         email,
//         address,
//         city,
//         pinCode,
//         state,
//         country,
//         phoneNo
//       });
//     }
//   }, [shippinginfo]);

  return (
    <>
      <h2>Shipping info:</h2>
      <div className="shipping-info">
        <div className="h-us-info">
          <p>
            <span>Name:</span>
            <span>{shippinginfo.fullName}</span>
          </p>
          <p>
            <span>Email:</span>
            <span>{shippinginfo.email}</span>
          </p>
        </div>
        <div className="addrs-info">
          <p>
            <span>Address:</span>
            <span>{shippinginfo.address}</span>
          </p>
          <p>
            <span>city:</span>
            <span>{shippinginfo.city}</span>
          </p>
          <p>
            <span>pinCode:</span>
            <span>{shippinginfo.pinCode}</span>
          </p>
          <p>
            <span>state:</span>
            <span>{shippinginfo.state}</span>
          </p>
          <p>
            <span>country:</span>
            <span>{shippinginfo.country}</span>
          </p>

          <p>
            <span>phoneNo:</span>
            <span>{shippinginfo.phoneNo}</span>
          </p>
        </div>
      </div>
    </>
  );
};
