import React, {useEffect} from 'react';
import styles from './Catalogs.module.css';
import cn from 'classnames';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProgressCourses} from "../../redux/slices/auth";
import {setLevel} from "./CatalogAll";

const CatalogStudy = ({items, title}) => {
  const dispatch = useDispatch();
  const progress = useSelector(state => state.auth.progressCourses);

  useEffect(() => {
    dispatch(fetchProgressCourses());
  }, []);

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.catalog}>
        {
          items?.map((item, index) => {
            const countLessons = item.modules.reduce((acc, elem) => acc + elem?.lessons.length, 0);
            const isActive = item.status === 'active';
            const level = setLevel(item.levelLanguage);

            return <Link key={item._id} to={isActive ? `${item._id}` : ''} className={styles.link}>
              <div className={styles.courseCard}>
                <div className={styles.cartContent}>
                  <h4>{item.title}</h4>
                  {/*<p>Автор: {item.user.fullName}</p>*/}
                  <div className={styles.tags}>
                    <div style={{marginBottom: '10px'}}>
                      {
                        !isActive ?
                          <p>Извините, в данный момент курс не доступен для прохождения.</p> :
                          <div className={styles.progress}>
                            <p>Пройдено {progress && progress[index]?.lessonsEnd.length} из {countLessons}</p>
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
