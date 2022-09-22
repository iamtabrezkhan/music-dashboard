import React, { useEffect, useState } from "react";
import classes from "./Main.module.css";
import PageLoader from "../PageLoader";
import { getMusicData } from "../../http";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch music data on mount
    fetchMusicData();
  }, []);

  const fetchMusicData = async () => {
    try {
      const res = await getMusicData();
      const data = res.data || {};
    } catch (error) {
      setError("Oops! Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return <div className={classes.main}></div>;
};

export default Main;
