import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth, selectRoleUser} from "../../redux/slices/auth";
import {fetchCourses} from "../../redux/slices/courses";
import {Navigate, Route, Routes} from "react-router-dom";
import Catalog from "../Catalog/Catalog";
import Course from "../Courses/Course/Course";
import CourseStudy from "../Study/CourseStudy/CourseStudy";
import CatalogAll from "../Catalogs/CatalogAll";

const Check = () => {
  const isAuth = useSelector(selectIsAuth);
  const userRole = useSelector(selectRoleUser);

  const dispatch = useDispatch();
  const {items} = useSelector(state => state.courses);

  const {data} = useSelector(state => state.auth);

  useEffect(() => {
    // dispatch(fetchCourses());
    // dispatch(fetchAuthMe());
  }, []);

  if (!isAuth || userRole !== 'moderator') {
    return <Navigate to={'/'}/>
  }

  // const getCheck = () => items.filter(item => item.status === 'check');
  //
  // const getActive = () => items.filter(item => item.status === 'active');

  return (
    <Routes>
      <Route path={'/*'} element={
        <CatalogAll title={'Мои проверки'} items={data?.reviewCourses}/>
      }/>
      <Route path={'/:courseId/*'} element={<Course isModerator={true}/>}/>
    </Routes>
  )
}

export default Check;
