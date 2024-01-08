import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../../../actions/CategoreAction";
const SelectCategore = ({ handelInputValue, parent }) => {
  const dispatch = useDispatch();

  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      <select
        name="parent"
        value={parent}
        onChange={(e) => handelInputValue(e)}
      >
        <option value={""}>none</option>
        {allcategroes &&
          allcategroes.map((parentCategory, i) => (
            <React.Fragment key={i}>
              <option value={parentCategory._id}>{parentCategory.name}</option>
              {parentCategory.childs.length > 0 &&
                parentCategory.childs.map((childCategory, j) => (
                  <option key={j} value={childCategory._id}>
                    {childCategory.name}
                  </option>
                ))}
            </React.Fragment>
          ))}
      </select>
    </>
  );
};

export default SelectCategore;
