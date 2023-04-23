import React from 'react';
import {Route, Routes} from "react-router-dom";
import PersonCourses from "./PersonCourses/PersonCourses";
import CreateCourse from "./CreateCourse/CreateCourse";

const Teaching = () => {
  return (
    <div style={{margin: '30px'}}>
      <Routes>
        <Route path="/" element={<PersonCourses />}/>
        <Route path="/new" element={<CreateCourse />}/>
      </Routes>
    </div>
  )
};

export default Teaching;
