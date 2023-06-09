import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Course from "./Course/Course";
import {useDispatch, useSelector} from "react-redux";
import {fetchCourses} from "../../redux/slices/courses";
import CatalogAll from "../Catalogs/CatalogAll";
import CourseStudy from "../Study/CourseStudy/CourseStudy";

const Courses = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const getActive = () => {
    return items?.filter(item => item.status === 'active');
  };

  return (
    <Routes>
      <Route path={'/*'} element={
        <CatalogAll items={getActive()} title={'Онлайн-курсы'} isModerator={false}/>
      }
      />
      <Route path={'/:courseId/*'} element={<Course isModerator={false} isStudy={true}/>}/>
      <Route path={'/:courseId/lessons/*'} element={<CourseStudy/>} />
    </Routes>
  );
};

export default Courses;
