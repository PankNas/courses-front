import React, {useEffect} from 'react';

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
import Moderate from "./components/Check/Moderate/Moderate";

export const pathFolder = `http://localhost:8000/uploads`

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <Routes>
          <Route path={'/'} element={<Main />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route path="/catalog/*" element={<Courses/>}/>
          <Route path="/study/*" element={<Study/>}/>
          <Route path="/teach/*" element={<Teaching/>}/>

          <Route path="/check/*" element={<Check/>}/>
          <Route path="/moderate/*" element={<Moderate/>}/>

          <Route path="/adm/*" element={<Adm/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
