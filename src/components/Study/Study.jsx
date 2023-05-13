import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProgressCourses, fetchStudentCourses} from "../../redux/slices/auth";
import axios from "../../axios";
import Catalog from "../Catalog/Catalog";
import {Route, Routes} from "react-router-dom";
import CourseStudy from "./CourseStudy/CourseStudy";
import ContentStudy from "./ContentStudy/ContentStudy";

const Study = () => {
  const dispatch = useDispatch();
  const {studentCourses, progressCourses} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchStudentCourses());
    dispatch(fetchProgressCourses());
  }, []);

  return (
    <>
      <Routes>
        <Route path={'/'} element={
          <Catalog title={'Обучение'} items={studentCourses} progress={progressCourses}/>
        }/>
        <Route path={':courseId/*'} element={<CourseStudy />} />
      </Routes>
    </>
  )
}

export default Study;
