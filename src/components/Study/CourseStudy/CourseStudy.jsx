import React, {useEffect, useState} from 'react';

import styles from './CourseStudy.module.scss';

import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {fetchGetCourse} from "../../../redux/slices/courses";
import ContentStudy from "../ContentStudy/ContentStudy";
import {fetchProgressCourses} from "../../../redux/slices/auth";
import axios from "../../../axios";
import Remark from "../../Remark/Remark";
import Button from "@mui/material/Button";
import {IconButton} from "@mui/material";

const CourseStudy = ({isModerate}) => {
  const {courseId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {course} = useSelector(state => state.courses);
  const {progressCourses, data} = useSelector(state => state.auth);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    dispatch(fetchGetCourse(courseId));

    setIsAuth(course?.user?._id === data?._id);
  }, []);

  const handleClickNav = async (event) => {
    if (isModerate || isAuth) {
      navigate(`${event.target.id}`);
      return;
    }

    // await dispatch(fetchProgressCourses());
    const user = (await axios.get('/auth/me')).data

    const course = (await axios.get(`/courses/${courseId}`)).data;
    const lessons = course.modules.flatMap(module => module.lessons);

    const indexLesson = lessons.findIndex(lesson => lesson._id === event.target.id);

    if (indexLesson === 0) navigate(`${event.target.id}`);

    const progress = user.progressCourses.find(course => course.course === courseId);

    if (progress?.lessonsEnd.length - 1 - indexLesson < -1) return;

    navigate(`${event.target.id}`);
  };

  return (
    <div className={styles.container}>
      <h1>{course?.title}</h1>
      <div className={styles.course}>
        <div className={styles.infoCourse}>
          <Link
            to={isModerate ? `/check/${courseId}` : `/study/${courseId}`}
            className={styles.link}
          >
            <button className={styles.button}>К описанию курса</button>
          </Link>
          {
            course?.modules.map(module =>
              <div key={module._id} className={styles.module}>
                <h3 style={{marginTop: '0'}}>{module.title}</h3>
                <ol className={styles.lessonsBlock}>
                  {
                    module.lessons.map(lesson =>
                      <li className={styles.lesson} key={lesson._id} id={lesson._id} onClick={handleClickNav}>
                        <button className={styles.buttonLesson} id={lesson._id}>
                          {lesson.title}
                        </button>
                      </li>
                    )
                  }
                </ol>
              </div>
            )
          }
        </div>

        {/*<div className={styles.content}>*/}
          <Routes>
            <Route path={':lessonId'} element={<ContentStudy isModerate={isModerate}/>}/>
          </Routes>
        {/*</div>*/}

        {/*{*/}
        {/*  isModerate && <div style={{width: '300px'}}><Remark/></div>*/}
        {/*}*/}
      </div>
    </div>
  );
};

export default CourseStudy;
