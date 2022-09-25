import React from "react";
import classes from "./MusicList.module.css";
import MusicItem from "./MusicItem";
import EmptyStateComponent from "../EmptyStateComponent";
import SearchingIllustration from "../../svgcomponents/SearchingIllustration";

const MusicList = (props) => {
  const { musicVideos, searchText, selectedGenres, selectedYear } = props;

  const getMusicVideosList = () => {
    const trimmedSearchText = searchText.trim();
    if (!trimmedSearchText && !selectedGenres?.length && !selectedYear) {
      return musicVideos;
    }
    return musicVideos.filter((video) => {
      let isMatch = true;
      if (trimmedSearchText) {
        const title = String(video.title).toLocaleLowerCase();
        isMatch = isMatch && title.includes(searchText.toLocaleLowerCase());
      }
      if (selectedGenres?.length) {
        isMatch = isMatch && selectedGenres.includes(video.genre_id);
      }
      if (selectedYear) {
        isMatch = isMatch && video.release_year == selectedYear;
      }
      return isMatch;
    });
  };

  const updatedMusicVideoList = getMusicVideosList();

  return (
    <div className={classes.container}>
      {updatedMusicVideoList?.length ? (
        <div className={classes.innerContainer}>
          {updatedMusicVideoList.map((item) => {
            return <MusicItem key={item.id} item={item} />;
          })}
        </div>
      ) : (
        <EmptyStateComponent
          illustration={<SearchingIllustration />}
          text={"No results found! Try a different search or filter."}
        />
      )}
    </div>
  );
};

export default React.memo(MusicList);
