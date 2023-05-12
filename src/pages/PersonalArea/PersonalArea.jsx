import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

import styles from './PersonalArea.module.css'

import Menu from "../../components/Menu/Menu";
import {Route, Routes} from "react-router-dom";
import Home from "../../components/Home/Home";
import Courses from "../../components/Courses/Courses";
import Teaching from "../../components/Teaching/Teaching";
import {fetchCourses} from "../../redux/slices/courses";
import {fetchAuthMe} from '../../redux/slices/auth';
import Study from "../../components/Study/Study";

const PersonalArea = () => {
  return (
    <div className={styles.root}>
      <Menu />

      <div style={{width: '1000px'}}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/courses/*" element={<Courses />}/>
          <Route path="/study/*" element={<Study />}/>
          <Route path="/teach/*" element={<Teaching />}/>
        </Routes>
      </div>
    </div>
  )
};

export default PersonalArea;
