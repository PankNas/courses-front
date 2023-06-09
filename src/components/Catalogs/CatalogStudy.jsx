import React, {useEffect, useState} from 'react';
import styles from './Catalogs.module.css';
import cn from 'classnames';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProgressCourses} from "../../redux/slices/auth";
import {setLevel} from "./CatalogAll";
import Search from "../Search/Search";
import {pathFolder} from "../../App";

const CatalogStudy = ({items, title}) => {
  const dispatch = useDispatch();
  const progress = useSelector(state => state.auth.progressCourses);
  const [courses, setCourses] = useState(items);

  useEffect(() => {
    dispatch(fetchProgressCourses());
  }, []);

  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = (items, isSearch) => {
    setCourses(items);
    setIsSearch(isSearch)
  }

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
          (isSearch ? courses : items)?.map((item, index) => {
            const countLessons = item.modules.reduce((acc, elem) => acc + elem?.lessons.length, 0);
            const isActive = item.status === 'active';
            const level = setLevel(item.levelLanguage);
            const score = item.scores.reduce((acc, elem) => acc + elem.score, 0) / item.scores.length || 0;

            return <Link key={item._id} to={isActive ? `${item._id}` : ''} className={styles.link}>
              <div className={styles.courseCard}>
                <div className={styles.cartContent}>
                  <div className={styles.headerCard}>
                    <h4 style={{margin: '0'}}>{item.title}</h4>
                    <div style={{display: 'flex'}}>
                      <img className={styles.imgHeader} src={`${pathFolder}/my/star_fill.svg`} alt="star"/>
                      {score.toFixed(1)}
                    </div>
                  </div>
                  {/*<p>Автор: {item.user.fullName}</p>*/}
                  <div className={styles.tags}>
                    <div style={{marginBottom: '10px'}}>
                      {
                        !isActive ?
                          <p>Извините, в данный момент курс не доступен для прохождения.</p> :
                          <div className={styles.progress}>
                            <p style={{marginBottom: '5px'}}>Пройдено {progress && progress[index]?.lessonsEnd.length} из {countLessons}</p>
                            <div
                              className={styles.progressBar}
                              style={{width: `${progress && progress[index]?.lessonsEnd.length * 100 / countLessons}%`}}
                            ></div>
                          </div>
                      }
                    </div>
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
            }
          )
        }
      </div>
    </div>
  );
};

export default CatalogStudy;
