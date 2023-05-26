import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentCourses} from "../../redux/slices/auth";
import Catalog from "../Catalog/Catalog";
import {Route, Routes} from "react-router-dom";
import CourseStudy from "./CourseStudy/CourseStudy";
import axios from "../../axios";
import CatalogStudy from "../Catalogs/CatalogStudy";
import Course from "../Courses/Course/Course";

const Study = () => {
  const dispatch = useDispatch();
  const {studentCourses} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchStudentCourses());
  }, []);

  const handleUnsubscribe = async (id) => {
    try {
      await axios.delete(`/courses/subscript/${id}`);
      dispatch(fetchStudentCourses());
    } catch (err) {
      console.log(err);
      console.warn('Не удалось отписаться от курса');
    }
  }

  return (
    <>
      <Routes>
        <Route path={'/*'} element={
          <CatalogStudy
            title={'Мое обучение'}
            items={studentCourses}
            // fnUnsubscribe={handleUnsubscribe}
          />
        }/>
        <Route path={'/:courseId/'} element={<Course />} />
        <Route path={'/:courseId/lessons/*'} element={<CourseStudy/>} />
      </Routes>
    </>
  )
}

export default Study;
