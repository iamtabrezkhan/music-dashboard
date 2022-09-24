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
      threshold: 0.2,
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

  let containerClass = classes.container;
  if (isVisible) {
    containerClass += " " + classes.containerVisible;
  }

  return (
    <div ref={containerRef} className={containerClass}>
      <div className={classes.innerContainer}>
        {isVisible ? <img src={item.image_url} alt={item.title} /> : null}
        <div className={classes.bottomContainer}>
          <div className={classes.artist}>{item.artist}</div>
          <div className={classes.titleContainer}>{item.title}</div>
        </div>
      </div>
    </div>
  );
};

export default MusicItem;
