import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { TreeItem, TreeView } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllCategories } from "../../../actions/CategoreAction";
const Categories = ({ categories, categoriesHeandler, clearFilter }) => {
  const [index, setIndex] = useState(null);
  const [removeClass, setRemoveClass] = useState(false);
  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);
  useEffect(() => {
    if (clearFilter) {
      setRemoveClass(true);
    }
   
  }, [clearFilter]);

  const heandleEvent = (e, i) => {
    if (i === index) {
      setIndex(null); // Remove the class
    } else {
      categoriesHeandler(e);
      setIndex(i);
      setRemoveClass(false);
    }
  };
  return (
    <>
      <Typography>Categories</Typography>
      {/* <ul>
        {categories.map((categorie, i) => {
          return (
            <li
              key={categorie}
              onClick={() => heandleEvent(categorie, i)}
              className={
                i === index && removeClass === false ? "cat-active" : ""
              }
            >
              {categorie}
            </li>
          );
        })}
      </ul> */}
      {/* ------------------------------------------- */}
      <div>
        <ul>
          {allcategroes &&
            allcategroes.map((item, i) => (
              <li key={i}>
                <NavLink to={`/product-category/${item.slug}`} className="parent-cate-list">
                  {item.name}
                </NavLink>
                <ul>
                  {item.childs.map((subitem, i) => (
                    <li key={i}>
                      <NavLink
                        to={`/product-category/${item.slug}/${subitem.slug}`}
                      >
                        {subitem.name}
                      </NavLink>{" "}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
        {/* <TreeView>
          <TreeItem nodeId="1" label="Beauty Item">
            <NavLink to={"/product-category/beauty-item/essential-oil/"}>
              <TreeItem nodeId="2" label="Essential Oil" />
            </NavLink>
            <NavLink to={"/product-category/beauty-item/oil-shampoo/"}>
              <TreeItem nodeId="2" label="Oil Shampoo" />
            </NavLink>
          </TreeItem>
        </TreeView> */}
      </div>
    </>
  );
};

export default Categories;
