import React from 'react';

import PersonalArea from "./pages/PersonalArea/PersonalArea";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PersonalArea/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  );
}

export default App;
