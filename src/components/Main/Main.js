import React from "react";
import classes from "./Main.module.css";
import PageLoader from "../PageLoader";

const Main = () => {
  return (
    <div className={classes.main}>
      <PageLoader />
    </div>
  );
};

export default Main;
