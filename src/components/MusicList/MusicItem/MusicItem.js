import React, { useEffect, useRef, useState } from "react";
import classes from "./MusicItem.module.css";

const MusicItem = (props) => {
  const { item } = props;
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(onbserverCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    });
    const conRef = containerRef.current;
    if (conRef) {
      observer.current.observe(conRef);
    }
    return () => {
      if (conRef) {
        observer.current.unobserve(conRef);
      }
    };
  }, []);

  const onbserverCallback = (entries) => {
    const [entry] = entries;
    if (!isVisible && entry.isIntersecting) {
      setIsVisible(true);
      if (observer.current) {
        observer.current.unobserve(containerRef.current);
      }
    }
  };

  return (
    <div ref={containerRef} className={classes.container}>
      {isVisible && (
        <div className={classes.innerContainer}>
          <img src={item.image_url} alt={item.title} />
          <div className={classes.bottomContainer}>
            <div className={classes.artist}>{item.artist}</div>
            <div className={classes.titleContainer}>{item.title}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicItem;
