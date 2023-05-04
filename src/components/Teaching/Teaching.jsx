import React from 'react';
import {Route, Routes} from "react-router-dom";

import PersonCourses from "./PersonCourses/PersonCourses";
import CreateCourse from "./CreateCourse/CreateCourse";
import VideoSample from "./Samples/VideoSample/VideoSample.jsx";
import TextSample from "./Samples/TextSample/TextSample";
import SentenceSample from "./Samples/SentenceSample/SentenceSample";
import PassesSample from "./Samples/PassesSample/PassesSample";

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

        <Route path="/:id/edit/passes-sample" element={<PassesSample />}/>
        <Route path="/:id/edit/passes-sample/:sampleId" element={<PassesSample />}/>
      </Routes>
    </div>
  )
};

export default Teaching;
