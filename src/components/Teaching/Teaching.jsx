import React from 'react';
import {Route, Routes} from "react-router-dom";

import PersonCourses from "./PersonCourses/PersonCourses";
import CreateCourse from "./CreateCourse/CreateCourse";
import VideoSample from "./VideoSample/VideoSample.jsx";
import TextSample from "./TextSample/TextSample";
import SentenceSample from "./SentenceSample/SentenceSample";

const Teaching = () => {
  return (
    <div style={{margin: '30px'}}>
      <Routes>
        <Route path="/" element={<PersonCourses />}/>
        <Route path="/:id/edit/*" element={<CreateCourse />} />

        <Route path="/:id/edit/video-sample/" element={<VideoSample />}/>
        <Route path="/:id/edit/video-sample/:sampleId" element={<VideoSample />}/>

        <Route path="/:id/edit/text-sample" element={<TextSample />}/>
        <Route path="/:id/edit/text-sample/:sampleId" element={<TextSample />}/>

        <Route path="/:id/edit/sentence-sample" element={<SentenceSample />}/>
        <Route path="/:id/edit/sentence-sample/:sampleId" element={<SentenceSample />}/>
      </Routes>
    </div>
  )
};

export default Teaching;
