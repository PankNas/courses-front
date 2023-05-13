import React, {useEffect, useState} from 'react';

import styles from './CourseStudy.module.scss';

import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, Outlet, Route, Routes, useParams} from "react-router-dom";
import {fetchGetCourse} from "../../../redux/slices/courses";
import ContentStudy from "../ContentStudy/ContentStudy";

const CourseStudy = () => {
  const {courseId} = useParams();
  const dispatch = useDispatch();

  const {course} = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchGetCourse(courseId));
  }, []);

  return (
    <div className={styles.courseStudy}>
      <div className={styles.lessons}>
        <ol>
          {
            course?.lessons.map((lesson, index) =>
              <NavLink
                key={lesson._id}
                to={`lesson/${lesson._id}`}
              >
                <li id={`${index}`} className={styles.lessonItem}>{lesson.title}</li>
              </NavLink>
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
