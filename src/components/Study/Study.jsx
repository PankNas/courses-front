import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentCourses} from "../../redux/slices/auth";
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

  return (
    <>
      <Routes>
        <Route path={'/*'} element={
          <CatalogStudy
            title={'Мое обучение'}
            items={studentCourses}
          />
        }/>
        <Route path={'/:courseId/'} element={<Course isStudy={true}/>} />
        <Route path={'/:courseId/lessons/*'} element={<CourseStudy/>} />
      </Routes>
    </>
  )
}

export default Study;
