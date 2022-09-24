import React from "react";
import classes from "./FilterHeader.module.css";

const FilterHeader = ({ onSearch }) => {
  return (
    <div className={classes.container}>
      <input
        className={classes.searchInput}
        onChange={onSearch}
        placeholder="Search videos..."
      />
    </div>
  );
};

export default FilterHeader;
