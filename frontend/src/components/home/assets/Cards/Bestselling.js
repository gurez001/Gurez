import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Bestselling = () => {
  const { error, products } = useSelector((state) => state.products);
  const { loading, product } = useSelector((state) => state.productFeature);

  let topProduct = [];
  products &&
    products.forEach((item, i) => {
      // if(item._id === product&& Number(product[0].productId))
      if (item._id === Number(product && product[0] && product[0].productId)) {
        topProduct.push(item);
      }
    });
  console.log(topProduct);
  const Cards = [
    {
      tittle: "Starting ₹349 | Bestselling Corrugated box",
      image:
        "https://gurez.com/wp-content/uploads/2023/04/corrugated-box-flap.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
  ];

  return (
    <>
      {/* {topProduct && topProduct.slice(0, 3).map((item, i) => (
        <div key={i} className="desktop-grid-4-card">
          <h2>Day of the product</h2>
          <div>
            <NavLink to={`/shop/${item.category}/${item.seo[0].metalink}`}>
            <img
              src={`http://localhost:8000/${item.imageId[0].path}`}
              alt="item"
            />
            <span>View now</span>
            </NavLink>
          </div>
        </div>
      ))} */}
    </>
  );
};

export default Bestselling;
