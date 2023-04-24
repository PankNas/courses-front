import React from 'react';
import {Route, Routes} from "react-router-dom";
import PersonCourses from "./PersonCourses/PersonCourses";
import CreateCourse from "./CreateCourse/CreateCourse";
import VideoLesson from "./CreateCourse/VideoLesson/VideoLesson.jsx";

const Teaching = () => {
  return (
    <div style={{margin: '30px'}}>
      <Routes>
        <Route path="/" element={<PersonCourses />}/>
        <Route path="/new" element={<CreateCourse />} />
        <Route path="/new/video-lesson" element={<VideoLesson />}/>
      </Routes>
    </div>
  )
};

export default Teaching;
