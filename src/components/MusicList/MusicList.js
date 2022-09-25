import React from "react";
import classes from "./MusicList.module.css";
import MusicItem from "./MusicItem";

const MusicList = (props) => {
  const { musicVideos, searchText, selectedGenres } = props;

  const getMusicVideosList = () => {
    const trimmedSearchText = searchText.trim();
    if (!trimmedSearchText && !selectedGenres?.length) {
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
      return isMatch;
    });
  };

  const updatedMusicVideoList = getMusicVideosList();

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        {updatedMusicVideoList.map((item) => {
          return <MusicItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default React.memo(MusicList);
