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

  return (
    <>
      <h1>Мои курсы</h1>
      <Button variant="outlined" onClick={handleClickAddCourse}>+ Новый курс</Button>
      <div>
        {
          teachCourses?.map(course =>
            <div key={course._id} className={styles.courseCard}>
              <h3>{course.title}</h3>
              <img src={course.imageUrl} alt="img"/>
              <Button id={course._id} variant="outlined" onClick={handleDelCourse}>Удалить</Button>
            </div>
          )
        }
      </div>
    </>
  )
};

export default PersonCourses;
