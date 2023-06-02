import React, {useEffect, useState} from 'react';
import styles from './Catalogs.module.css';
import cn from 'classnames';
import {Link} from "react-router-dom";
import Search from "../Search/Search";
import {pathFolder} from "../../App";

export const setLevel = (level) => {
  switch (level) {
    case 'Начальный':
      return 'beginning';
    case 'Ниже среднего':
      return 'elementary';
    case 'Средний':
      return 'intermediate';
    case 'Выше среднего':
      return 'upperIntermediate';
    case 'Продвинутый':
      return 'advanced';
    case 'Профессиональный':
      return 'proficiency';
  }
};

const CatalogAll = ({items, title, isStudy}) => {
  const [courses, setCourses] = useState(items);
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = (items, isSearch) => {
    setCourses(items);
    setIsSearch(isSearch)
  }

  console.log(items);

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      <Search
        items={items}
        // setCourses={setCourses}
        fnSearch={handleSearch}
      />
      <div className={styles.catalog}>
        {
          (isSearch ? courses : items)?.map((item) => {
            const level = setLevel(item.levelLanguage);
            const score = item.scores.reduce((acc, elem) => acc + elem.score, 0) / item.scores.length || 0;

            return <Link key={item._id} to={`${item._id}`} className={styles.link}>
              <div className={styles.courseCard}>
                <div className={styles.cartContent}>
                  <div className={styles.headerCard}>
                    <h4 style={{margin: '0'}}>{item.title}</h4>
                    <img className={styles.imgHeader} src={`${pathFolder}/my/star_fill.svg`} alt="star"/>
                    {score.toFixed(1)}
                  </div>
                  {/*<p>Автор: {item.user.fullName}</p>*/}
                  <div className={styles.tags}>
                    <div className={styles.language}>{item.language}</div>
                    <div className={cn(styles.language, styles[level])}>{item.levelLanguage}</div>
                  </div>
                </div>
                <img
                  className={styles.img}
                  src={`http://localhost:8000${item.imageUrl}`} alt="img"
                />
              </div>
            </Link>;
          })
        }
      </div>
    </div>
  );
};

export default CatalogAll;
