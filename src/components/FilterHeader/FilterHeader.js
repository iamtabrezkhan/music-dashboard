import React, { useMemo } from "react";
import classes from "./FilterHeader.module.css";
import debounce from "lodash.debounce";
import Select from "react-select";

const selectStyles = {
  container: (styles) => ({
    ...styles,
    flex: 1,
    fontSize: "1.6rem",
  }),
  control: (styles, state) => ({
    ...styles,
    borderColor: state.isFocused
      ? "var(--borderHover) !important"
      : "var(--borderDefault) !important",
    boxShadow: "0px 0px 1px var(--borderDefault) !important",
  }),
};

const FilterHeader = (props) => {
  const { onSearch, genres, onSelectGenres, years, onSelectYear } = props;

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

  const getYearOptions = () => {
    return years.map((year) => ({
      value: year,
      label: year,
    }));
  };

  const onChangeGenresSelect = (params) => {
    onSelectGenres(params.map(({ value }) => value));
  };

  const onChangeYearSelect = (params) => {
    const { value } = params || {};
    onSelectYear(value);
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
          onChange={onChangeGenresSelect}
          isMulti={true}
          styles={selectStyles}
          placeholder={"Select genres..."}
        />
        <Select
          options={getYearOptions()}
          onChange={onChangeYearSelect}
          styles={selectStyles}
          placeholder={"Select year..."}
        />
      </div>
    </div>
  );
};

export default React.memo(FilterHeader);
