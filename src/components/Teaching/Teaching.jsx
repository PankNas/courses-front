import React from 'react';
import {Route, Routes} from "react-router-dom";

import PersonCourses from "./PersonCourses/PersonCourses";
import CreateCourse from "./CreateCourse/CreateCourse";
import VideoSample from "./VideoSample/VideoSample.jsx";

const Teaching = () => {
  return (
    <div style={{margin: '30px'}}>
      <Routes>
        <Route path="/" element={<PersonCourses />}/>
        <Route path="/:id/edit" element={<CreateCourse />} />
        <Route path="/:id/edit/video-lesson" element={<VideoSample />}/>
      </Routes>
    </div>
  )
};

export default Teaching;
