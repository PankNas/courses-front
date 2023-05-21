import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCourses} from "../../redux/slices/courses";
import styles from "./Catalog.module.scss";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {fetchProgressCourses, fetchStudentCourses} from "../../redux/slices/auth";
import axios from "../../axios";

const Catalog = ({title, items, isProgress, fnUnsubscribe}) => {
  const dispatch = useDispatch();
  const progress = useSelector(state => state.auth.progressCourses);

  useEffect(() => {
    if (isProgress) {
      dispatch(fetchProgressCourses());
    }
  }, []);

  const handleClickDel = (event) => {
    if (!window.confirm('Вы уверены, что хотите отписаться от курса?')) return;

    fnUnsubscribe(event.target.id);
  };

  return (
    <div style={{margin: '30px'}}>
      <h1>{title}</h1>
      <div className={styles.courses}>
        {
          items?.map((course, index) => {
            const countLessons = isProgress ? course?.modules.reduce((acc, elem) => acc + elem?.lessons.length, 0) : 0;

            return <div key={course._id} className={styles.courseCard}>
              <div className={styles.cardDesc}>
                {
                  course.imageUrl &&
                  <img className={styles.courseImg} src={`http://localhost:8000${course.imageUrl}`} alt="img"/>
                }
                <div className={styles.courseContent}>
                  <h3 style={{textAlign: "center"}}>{course.title}</h3>
                </div>
              </div>
              {
                progress !== null && progress !== undefined && isProgress &&
                <div className={styles.progress}>
                  <p>Пройдено {progress[index]?.lessonsEnd.length} из {countLessons}</p>
                  <div
                    className={styles.progressBar}
                    style={{width: `${progress[index]?.lessonsEnd.length * 100 / countLessons}%`}}
                  ></div>
                </div>
              }
              <div style={{display: "inline-block"}}>
                <Link to={`${course._id}`} className={styles.linkCourse}>
                  <Button
                    id={course._id}
                    variant={'outlined'}
                    style={{marginTop: "15px", marginRight: "15px"}}
                  >
                    {isProgress ? 'Продолжить' : 'Подробнее'}
                  </Button>
                </Link>
                {
                  isProgress &&
                  <Button
                    id={course._id}
                    variant={'outlined'}
                    style={{marginTop: "15px"}}
                    color={'error'}
                    onClick={handleClickDel}
                  >
                    Отписаться
                  </Button>
                }
              </div>
            </div>;
          })
        }
      </div>
    </div>
  );
};

export default Catalog;
