import React, {useEffect, useRef, useState} from 'react';
import styles from './Slider.module.css';
import debounce from "lodash.debounce";
import cn from "classnames";

const MySlider = ({slides}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const listRef = useRef(null);

  const checkForScrollPosition = () => {
    const {current} = listRef;
    if (current) {
      const {scrollLeft, scrollWidth, clientWidth} = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
    }
  };

  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

  const scrollContainerBy = (distance) =>
    listRef.current?.scrollBy({left: distance, behavior: "smooth"});

  useEffect(() => {
    const {current} = listRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, []);

  return (
    <div className={styles.blocksLanguages}>
      <div className={styles.scrollableContainer}>
        <ul className={styles.list} ref={listRef}>
          {
            slides.map((item, index) =>
              <li style={{marginRight: "1.5em"}} key={index}>
                <div className={styles.block}>
                  <img src={item.src} alt="flag" className={styles.flag}/>
                  <div className={styles.languageName}>
                    <p className={styles.languageText}>{item.title}</p>
                  </div>
                </div>
              </li>
            )
          }
        </ul>

        <button
          type="button"
          disabled={!canScrollLeft}
          onClick={() => scrollContainerBy(-400)}
          className={cn(styles.button, styles.buttonLeft, {
            "button--hidden": !canScrollLeft
          })}
        >
          ←
        </button>
        <button
          type="button"
          disabled={!canScrollRight}
          onClick={() => scrollContainerBy(400)}
          className={cn(styles.button, styles.buttonRight, {
            "button--hidden": !canScrollRight
          })}
        >
          →
        </button>
        {canScrollLeft ? (
          <div className={cn(styles.shadowWrapper, styles.leftShadowWrapper)}>
            <div className={cn(styles.shadow, styles.leftShadow)}/>
          </div>
        ) : null}
        {canScrollRight ? (
          <div className={cn(styles.shadowWrapper, styles.rightShadowWrapper)}>
            <div className={cn(styles.shadow, styles.rightShadow)}/>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MySlider;
