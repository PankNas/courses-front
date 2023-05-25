import React from 'react';
import {Route, Routes} from "react-router-dom";

import PersonCourses from "./PersonCourses/PersonCourses";
import CreateCourse from "./CreateCourse/CreateCourse";
import Sample from "./Samples/Sample";

const Teaching = () => {
  return (
    <div style={{margin: '30px'}}>
      <Routes>
        <Route path="/" element={<PersonCourses/>}/>
        <Route path="/edit/*" element={<CreateCourse/>}/>
        <Route path="/edit/module/:moduleId/sample/*" element={<Sample/>} />
        <Route path="/edit/module/:moduleId/sample/:sampleId" element={<Sample/>}/>

        <Route path="/:id/edit/*" element={<CreateCourse/>}/>
        <Route path="/:id/edit/module/:moduleId/sample/*" element={<Sample/>} />
        <Route path="/:id/edit/module/:moduleId/sample/:sampleId" element={<Sample/>}/>
      </Routes>
    </div>
  );
};

export default Teaching;
