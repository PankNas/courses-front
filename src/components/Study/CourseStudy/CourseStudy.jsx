import React, {useEffect, useState} from 'react';

import styles from './CourseStudy.module.scss';

import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, Route, Routes, useParams} from "react-router-dom";
import {fetchGetCourse} from "../../../redux/slices/courses";
import ContentStudy from "../ContentStudy/ContentStudy";

const CourseStudy = () => {
  const {courseId} = useParams();
  const dispatch = useDispatch();

  const {course} = useSelector(state => state.courses);
  const [lesson, setLesson] = useState();

  useEffect(() => {
    dispatch(fetchGetCourse(courseId));
  }, []);

  const handleClickLesson = (event) => {
    setLesson(course.lessons[+event.target.id]);
  }

  return (
    <div className={styles.courseStudy}>
      <div className={styles.lessons}>
        <ol>
          {
            course?.lessons.map((lesson, index) =>
              <Link
                key={lesson._id}
                id={`${index}`}
                to=''
                onClick={handleClickLesson}
              >
                <li className={styles.lessonItem}>{lesson.title}</li>
              </Link>
            )
          }
        </ol>
      </div>

      <ContentStudy lesson={lesson}/>
    </div>
  );
};

export default CourseStudy;
