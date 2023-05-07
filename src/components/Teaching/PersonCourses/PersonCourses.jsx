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
  console.log(teachCourses);

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

  return (
    <>
      <h1>Мои курсы</h1>
      <Button variant="outlined" onClick={handleClickAddCourse}>+ Новый курс</Button>
      <div className={styles.courses}>
        {
          teachCourses?.map(course =>
            <div key={course._id} className={styles.courseCard}>
              {
                course.imageUrl &&
                <img className={styles.courseImg} src={`http://localhost:8000${course.imageUrl}`} alt="img"/>
              }
              <h3>{course.title}</h3>
              <Button
                id={course._id}
                style={{color: "red"}}
                variant="outlined"
                onClick={handleDelCourse}
              >
                X
              </Button>
              <Button
                id={course._id}
                variant="outlined"
                onClick={handleEditCourse}
              >
                P
              </Button>
            </div>
          )
        }
      </div>
    </>
  )
};

export default PersonCourses;
