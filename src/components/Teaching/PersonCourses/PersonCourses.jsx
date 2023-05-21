import React, {useEffect} from 'react';

import styles from './PersonCourses.module.scss';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import axios from "../../../axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, fetchTeachCourses} from "../../../redux/slices/auth";
import {fetchRemoveCourse} from "../../../redux/slices/courses";

const PersonCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teachCourses = useSelector(state => state.auth.teachCourses);

  useEffect(() => {
    dispatch(fetchTeachCourses());
  }, []);

  const handleClickAddCourse = async () => {
    try {
      const {data} = await axios.post("/courses", {});

      navigate(`/teach/${data._id}/edit/`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании курса');
    }
  }
  const handleDelCourse = (event) => {
    dispatch(fetchRemoveCourse(event.target.id));
    dispatch(fetchTeachCourses());
  }
  const handleEditCourse = (event) => {
    navigate(`${event.target.id}/edit`)
  }

  const setStatus = (status) => {
    let res;

    if (status === 'passive')
      res = 'черновик';
    else if (status === 'check')
      res = 'на проверке';
    else
      res = 'одобрен';

    return res;
  };

  const handleClickCheck = async (event) => {
    const course = teachCourses.find(item => item._id === event.target.id);
    course.status = 'check';

    await axios.patch(`/courses/${event.target.id}`, course);
  }

  return (
    <>
      <h1>Мои курсы</h1>
      <Button variant="outlined" onClick={handleClickAddCourse}>+ Новый курс</Button>
      <div className={styles.courses}>
        {
          teachCourses?.map(course =>
            <div key={course._id} className={styles.courseCard}>
              <p>Статус: {setStatus(course.status)}</p>

              <div className={styles.courseContent}>
                {
                  course.imageUrl &&
                  <img className={styles.courseImg} src={`http://localhost:8000${course.imageUrl}`} alt="img"/>
                }
                <div >
                  <h3 style={{textAlign: "center"}}>{course.title}</h3>
                  <div className={styles.courseButtons}>
                    <Button
                      id={course._id}
                      size={'large'}
                      variant="outlined"
                      onClick={handleEditCourse}
                      style={{marginRight: "15px"}}
                    >
                      Pедактировать
                    </Button>
                    <Button
                      id={course._id}
                      size={'large'}
                      variant="outlined"
                      onClick={handleClickCheck}
                      style={{marginRight: "15px"}}
                    >
                      Опубликовать
                    </Button>
                    <Button
                      id={course._id}
                      style={{color: "red"}}
                      variant="outlined"
                      onClick={handleDelCourse}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
};

export default PersonCourses;
