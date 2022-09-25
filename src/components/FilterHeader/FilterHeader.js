import React, { useMemo } from "react";
import classes from "./FilterHeader.module.css";
import debounce from "lodash.debounce";
import Select from "react-select";

const FilterHeader = ({ onSearch, genres, onSelectGenres }) => {
  const debouncedOnSearch = useMemo(
    () =>
      debounce((e) => {
        const { value } = e.target;
        onSearch(value);
      }, 300),
    []
  );

  const getGenresOptions = () => {
    return genres.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  };

  const onChangeMultiSelect = (values) => {
    onSelectGenres(values.map(({ value }) => value));
  };

  return (
    <div className={classes.container}>
      <input
        className={classes.searchInput}
        onChange={debouncedOnSearch}
        placeholder="Search videos..."
      />
      <div className={classes.dropdownContainer}>
        <Select
          options={getGenresOptions()}
          onChange={onChangeMultiSelect}
          isMulti={true}
          styles={{
            container: (styles) => ({
              ...styles,
              fontSize: "1.6rem",
            }),
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(FilterHeader);
