import React from 'react';
import {Route, Routes} from "react-router-dom";
import Catalog from "./Catalog/Catalog";
import Course from "./Course/Course";

const Courses = () => {

  return (
    <Routes>
      <Route path={'/'} element={<Catalog/>}/>
      <Route path={'/:courseId'} element={<Course />}/>
    </Routes>
  )
};

export default Courses;
