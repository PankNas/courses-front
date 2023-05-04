import React from 'react';
import {Route, Routes} from "react-router-dom";

import PersonCourses from "./PersonCourses/PersonCourses";
import CreateCourse from "./CreateCourse/CreateCourse";
import Samples from "./Samples/Samples";

const Teaching = () => {
  return (
    <div style={{margin: '30px'}}>
      <Routes>
        <Route path="/" element={<PersonCourses/>}/>
        <Route path="/:id/edit/*" element={<CreateCourse/>}/>
        <Route path="/:id/edit/sample/" element={<Samples/>}/>
        <Route path="/:id/edit/sample/:sampleId" element={<Samples/>}/>
      </Routes>
    </div>
  );
};

export default Teaching;
