import React, { useMemo } from "react";
import classes from "./FilterHeader.module.css";
import debounce from "lodash.debounce";

const FilterHeader = ({ onSearch }) => {
  const debouncedOnSearch = useMemo(
    () =>
      debounce((e) => {
        const { value } = e.target;
        onSearch(value);
      }, 300),
    []
  );

  return (
    <div className={classes.container}>
      <input
        className={classes.searchInput}
        onChange={debouncedOnSearch}
        placeholder="Search videos..."
      />
    </div>
  );
};

export default React.memo(FilterHeader);
