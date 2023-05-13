import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentCourses} from "../../redux/slices/auth";
import Catalog from "../Catalog/Catalog";
import {Route, Routes} from "react-router-dom";
import CourseStudy from "./CourseStudy/CourseStudy";

const Study = () => {
  const dispatch = useDispatch();
  const {studentCourses} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchStudentCourses());
  }, []);

  return (
    <>
      <Routes>
        <Route path={'/'} element={
          <Catalog title={'Обучение'} items={studentCourses} isProgress={true}/>
        }/>
        <Route path={':courseId/*'} element={<CourseStudy />} />
      </Routes>
    </>
  )
}

export default Study;
