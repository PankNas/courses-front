import React, {useEffect} from 'react';

import PersonalArea from "./pages/PersonalArea/PersonalArea";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./redux/slices/auth";
import styles from './App.module.css'
import Footer from "./components/Footer/Footer";
import Courses from "./components/Courses/Courses";
import Study from "./components/Study/Study";
import Teaching from "./components/Teaching/Teaching";
import Check from "./components/Check/Check";
import Adm from "./components/Adm/Adm";

export const pathFolder = `http://localhost:8000/uploads`

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path={'/'} element={<Main />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/catalog/*" element={<Courses/>}/>
        <Route path="/study/*" element={<Study/>}/>
        <Route path="/teach/*" element={<Teaching/>}/>
        <Route path="/check/*" element={<Check/>}/>

        <Route path="/adm/*" element={<Adm/>}/>

        {/*<Route path="/area/*" element={<PersonalArea/>}/>*/}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
