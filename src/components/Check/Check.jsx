import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth, selectRoleUser} from "../../redux/slices/auth";
import {fetchCourses} from "../../redux/slices/courses";
import {Navigate, Route, Routes} from "react-router-dom";
import Course from "../Courses/Course/Course";
import CourseStudy from "../Study/CourseStudy/CourseStudy";
import CatalogAll from "../Catalogs/CatalogAll";

const Check = () => {
  const {data} = useSelector(state => state.auth);

  useEffect(() => {

  }, []);

  return (
    <Routes>
      <Route path={'/*'} element={
        <CatalogAll title={'Мои проверки'} items={data?.reviewCourses} isModerate={true}/>
      }/>
      <Route path={'/:courseId/*'} element={<Course isModerator={true}/>}/>
      <Route path={'/:courseId/lessons/*'} element={<CourseStudy isModerate={true}/>} />
    </Routes>
  )
}

export default Check;
