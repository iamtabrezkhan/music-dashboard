import React from "react";
import classes from "./MusicList.module.css";
import MusicItem from "./MusicItem";

const MusicList = (props) => {
  const { musicVideos, searchText } = props;
  console.log(musicVideos);

  const getMusicVideosList = () => {
    if (!searchText) {
      return musicVideos;
    }
    return musicVideos.filter((video) => {
      const title = String(video.title).toLocaleLowerCase();
      return title.includes(searchText.toLocaleLowerCase());
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
