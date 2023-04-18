import React from 'react';

import Main from "./pages/Main/Main";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Regiter/Register";
import Courses from "./components/Courses/Courses";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Main />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
