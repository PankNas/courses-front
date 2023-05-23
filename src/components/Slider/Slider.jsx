import React, {useEffect, useRef, useState} from 'react';
import styles from './Slider.module.css';

const MySlider = ({slides}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let intervalId;
    const container = containerRef.current;

    // Автоматическая прокрутка каждые 5 секунд
    intervalId = setInterval(() => {
      const nextScrollLeft = container.scrollLeft + container.offsetWidth;
      if (nextScrollLeft >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ display: 'flex', overflowX: 'scroll', scrollBehavior: 'smooth' }}
    >
      <div style={{ width: 200, height: 200, backgroundColor: 'red', margin: 10 }} />
      <div style={{ width: 200, height: 200, backgroundColor: 'green', margin: 10 }} />
      <div style={{ width: 200, height: 200, backgroundColor: 'blue', margin: 10 }} />
    </div>
  );
};

export default MySlider;
