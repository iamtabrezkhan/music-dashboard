import React, { useCallback, useEffect, useState } from "react";
import classes from "./Main.module.css";
import PageLoader from "../PageLoader";
import { getMusicData } from "../../http";
import FilterHeader from "../FilterHeader";
import MusicList from "../MusicList";
import EmptyStateComponent from "../EmptyStateComponent";
import ErrorIllustration from "../../svgcomponents/ErrorIllustration";

const Main = () => {
  const [genres, setGenres] = useState([]);
  const [musicVideos, setMusicVideos] = useState([]);
  const [years, setYears] = useState([]);
  // ====
  const [searchText, setSearchText] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  // =====

  useEffect(() => {
    // fetch music data on mount
    fetchMusicData();
  }, []);

  const getUniqYearFromVideos = ({ videos }) => {
    const hashMap = {};
    const output = [];
    for (const video of videos) {
      const { release_year } = video;
      if (!hashMap[release_year]) {
        output.push(release_year);
        hashMap[release_year] = true;
      }
    }
    return output.sort();
  };

  const fetchMusicData = async () => {
    try {
      const res = await getMusicData();
      const data = res.data || {};
      const { genres = [], videos = [] } = data;
      setGenres(genres);
      setMusicVideos(videos);
      setYears(getUniqYearFromVideos({ videos }));
    } catch (error) {
      setError("Oops! Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = useCallback((value) => {
    setSearchText(value);
  }, []);

  const onSelectGenres = (value) => {
    setSelectedGenres(value);
  };

  const onSelectYear = (value) => {
    setSelectedYear(value);
  };

  if (isLoading) {
    return <PageLoader />;
  }
  console.log(selectedYear);
  return (
    <div className={classes.container}>
      {error ? (
        <EmptyStateComponent
          text={error}
          illustration={<ErrorIllustration />}
        />
      ) : (
        <div className={classes.innerContainer}>
          <FilterHeader
            genres={genres}
            onSelectGenres={onSelectGenres}
            onSearch={onSearch}
            onSelectYear={onSelectYear}
            years={years}
          />
          <MusicList
            musicVideos={musicVideos}
            searchText={searchText}
            selectedGenres={selectedGenres}
            selectedYear={selectedYear}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
