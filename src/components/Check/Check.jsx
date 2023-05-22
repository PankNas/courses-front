import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {fetchCourses} from "../../redux/slices/courses";
import {Route, Routes} from "react-router-dom";
import Catalog from "../Catalog/Catalog";
import Course from "../Courses/Course/Course";
import CourseStudy from "../Study/CourseStudy/CourseStudy";

const Check = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.courses);
  const [checkCourses, setCheckCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const getCheck = () => {
    return items.filter(item => item.status === 'check');
    // console.log(check);
    //
    // setCheckCourses(check);
  }

  return (
    <Routes>
      <Route path={'/'} element={
        <Catalog title={'Курсы на проверку'} items={getCheck()} isProgress={false}/>}
      />
      <Route path={'/:courseId'} element={<Course isModerator={true}/>}/>
      <Route path={'/:courseId/*'} element={<CourseStudy isModerate={true}/>}/>
    </Routes>
  )
}

export default Check;
