import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Catalog from "../Catalog/Catalog";
import Course from "./Course/Course";
import {useDispatch, useSelector} from "react-redux";
import {fetchCourses} from "../../redux/slices/courses";

const Courses = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const getActive = () => {
    return items.filter(item => item.status === 'active');
  }

  return (
    <Routes>
      <Route path={'/'} element={
        <Catalog title={'Каталог курсов'} items={getActive()} isProgress={false}/>}
      />
      <Route path={'/:courseId'} element={<Course isModerator={false}/>}/>
    </Routes>
  )
};

export default Courses;
