import React from "react";
import ReactDOM from "react-dom";
import classes from "./PageLoader.module.css";
import MusicIcon from "../../svgcomponents/MusicIcon";

const Loader = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.iconContainer}>
        <MusicIcon width={50} height={50} />
      </div>
    </div>
  );
};

const PageLoader = () => {
  return ReactDOM.createPortal(<Loader />, document.body);
};

export default PageLoader;
