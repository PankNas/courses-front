import React from 'react';

import styles from './PersonalArea.module.css'

import Menu from "../../components/Menu/Menu";
import {Route, Routes} from "react-router-dom";
import Home from "../../components/Home/Home";
import Courses from "../../components/Courses/Courses";
import Teaching from "../../components/Teaching/Teaching";

const PersonalArea = () => {
  return (
    <div className={styles.root}>
      <Menu />

      <div style={{width: '700px'}}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/courses" element={<Courses />}/>
          <Route path="/teach/*" element={<Teaching />}/>
        </Routes>
      </div>
    </div>
  )
};

export default PersonalArea;