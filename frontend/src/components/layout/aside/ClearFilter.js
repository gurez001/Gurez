import React from "react";

const ClearFilter = ({ clearFilterHeandler, clearFilter }) => {
  return (
    <div className="filter-ac">
      <button onClick={() => clearFilterHeandler()}>Clear All Filter</button>
    </div>
  );
};

export default ClearFilter;
