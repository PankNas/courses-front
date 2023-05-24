import React, {useEffect} from 'react';
import styles from './Catalogs.module.css';
import cn from 'classnames';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProgressCourses} from "../../redux/slices/auth";

const CatalogModerate = ({items, title}) => {
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

              return <Link key={item._id} to={isActive ? `${item._id}` : ''}>
                <div className={styles.courseCard}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>Автор: {item.fullName}</p>
                    <div className={styles.tags}>
                      <div className={styles.language} style={{marginRight: "10px"}}>{item.language}</div>
                      <div className={cn(styles.language, styles.levelLanguage)}>{item.levelLanguage}</div>
                    </div>

                    {
                      !isActive ?
                        <p>Извините, в данный момент курс не доступен для прохождения.</p> :
                        <div className={styles.progress}>
                          <p>Пройдено {progress[index]?.lessonsEnd.length} из {countLessons}</p>
                          <div
                            className={styles.progressBar}
                            style={{width: `${progress[index]?.lessonsEnd.length * 100 / countLessons}%`}}
                          ></div>
                        </div>
                    }
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

export default CatalogModerate;
