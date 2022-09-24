import React from "react";
import classes from "./ErrorComponent.module.css";
import ErrorIllustration from "../../svgcomponents/ErrorIllustration";

const ErrorComponent = (props) => {
  const { error } = props;
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.illustration}>
          <ErrorIllustration />
        </div>
        <div className={classes.errorText}>{error}</div>
      </div>
    </div>
  );
};

export default ErrorComponent;
