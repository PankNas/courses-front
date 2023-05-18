import React, {useEffect, useState} from 'react';

import styles from './CourseStudy.module.scss';

import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, Outlet, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {fetchGetCourse} from "../../../redux/slices/courses";
import ContentStudy from "../ContentStudy/ContentStudy";
import {fetchProgressCourses} from "../../../redux/slices/auth";
import axios from "../../../axios";

const CourseStudy = () => {
  const {courseId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {course} = useSelector(state => state.courses);
  const {progressCourses} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchGetCourse(courseId));
  }, []);

  const handleClickNav = async (event) => {
    await dispatch(fetchProgressCourses());

    const course = (await axios.get(`courses/${courseId}`)).data;
    const indexLesson = course.lessons.findIndex(lesson => lesson._id === event.target.id);

    if (indexLesson === 0) navigate(`lesson/${event.target.id}`);

    const progress = progressCourses.find(course => course.course === courseId);

    if (progress.lessonsEnd.length - 1 - indexLesson < -1) return;

    navigate(`lesson/${event.target.id}`);
  }

  return (
    <div className={styles.courseStudy}>
      <div className={styles.lessons}>
        <ol>
          {
            course?.lessons.map((lesson, index) =>
              <li
                key={lesson._id}
                className={styles.lessonItem}
              >
                <button id={lesson._id} onClick={handleClickNav}>
                  {lesson.title}
                </button>
              </li>
            )
          }
        </ol>
      </div>

      <Routes>
        <Route path={'lesson/:lessonId'} element={<ContentStudy/>}/>
      </Routes>
    </div>
  );
};

export default CourseStudy;
