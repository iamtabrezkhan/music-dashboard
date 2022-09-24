import React, { useCallback, useEffect, useState } from "react";
import classes from "./Main.module.css";
import PageLoader from "../PageLoader";
import { getMusicData } from "../../http";
import FilterHeader from "../FilterHeader";
import MusicList from "../MusicList";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [musicVideos, setMusicVideos] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // fetch music data on mount
    fetchMusicData();
  }, []);

  const fetchMusicData = async () => {
    try {
      const res = await getMusicData();
      const data = res.data || {};
      const { genres = [], videos = [] } = data;
      setGenres(genres);
      setMusicVideos(videos);
    } catch (error) {
      setError("Oops! Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = useCallback((value) => {
    setSearchText(value);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <FilterHeader onSearch={onSearch} />
        <MusicList musicVideos={musicVideos} searchText={searchText} />
      </div>
    </div>
  );
};

export default Main;
