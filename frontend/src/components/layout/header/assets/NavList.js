import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../../../actions/CategoreAction";
import { FaWineBottle } from "react-icons/fa";
import { GiBeerBottle } from "react-icons/gi";

export const NavList = ({ toggleContentRemove }) => {
  const data = useParams();

  const dispatch = useDispatch();

  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);

  

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
const icons=[<FaWineBottle />,<GiBeerBottle />,]
  return (  
    <>
      <div className="nav-col nav-li-list">
        <ul className="nav-list parent-navlist">
          <li>
            <NavLink to={"/shop"} onClick={toggleContentRemove}>
              Shop
            </NavLink>
          </li>
          {allcategroes &&
            allcategroes.map((item, i) => (
              <li key={i}>
                <NavLink to={`/product-category/${item.slug}`} >
                  {item.name}
                </NavLink>
                <ul className="child-navlist">
                  {item.childs.map((subItem, i) => (
                    <li key={i}>
                      <NavLink 
                        to={`/product-category/${item.slug}/${subItem.slug}`}
                      >
                        {subItem.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

          <li>
            <NavLink to={"/contact-us"}>Contact Us</NavLink>
          </li>
          <li>
            <NavLink to={"/blog"}>Blog</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
