import React from "react";
import classes from "./EmptyStateComponent.module.css";

const ErrorComponent = (props) => {
  const { text, illustration } = props;
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.illustration}>{illustration}</div>
        <div className={classes.textContainer}>{text}</div>
      </div>
    </div>
  );
};

export default ErrorComponent;
