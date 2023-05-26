import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Catalog from "../Catalog/Catalog";
import Course from "./Course/Course";
import {useDispatch, useSelector} from "react-redux";
import {fetchCourses} from "../../redux/slices/courses";
import CatalogAll from "../Catalogs/CatalogAll";
import {fetchAuthMe, selectIsAuth} from "../../redux/slices/auth";
import CourseStudy from "../Study/CourseStudy/CourseStudy";

const Courses = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.courses);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  // if (!isAuth) {
  //   return <Navigate to={'/'} />
  // }

  const getActive = () => {
    return items?.filter(item => item.status === 'active');
  };

  return (
    <Routes>
      <Route path={'/*'} element={
        // <Catalog title={'Каталог курсов'} items={getActive()} isProgress={false}/>
        <CatalogAll items={getActive()} title={'Онлайн-курсы'} isModerator={false}/>
      }
      />
      <Route path={'/:courseId/*'} element={<Course isModerator={false}/>}/>
      <Route path={'/:courseId/lessons/*'} element={<CourseStudy/>} />
    </Routes>
  );
};

export default Courses;
