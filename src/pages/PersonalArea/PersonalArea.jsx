import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

import styles from './PersonalArea.module.css'

import Menu from "../../components/Menu/Menu";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../../components/Home/Home";
import Courses from "../../components/Courses/Courses";
import Teaching from "../../components/Teaching/Teaching";
import {fetchCourses} from "../../redux/slices/courses";
import {fetchAuthMe, selectIsAuth} from '../../redux/slices/auth';
import Study from "../../components/Study/Study";
import Check from "../../components/Check/Check";

const PersonalArea = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());

    if (user.status === 'loaded') {
      // if (user.data?.role === 'member') return <Navigate to="/study" />;
      if (user.data?.role === 'moderator') return <Navigate to="/check" />;
    }
  }, []);

  return (
    <div className={styles.root}>
      <Menu />

      <div style={{width: '1000px'}}>
        <Routes>
          {/*<Route path="/" element={<Home />}/>*/}
          <Route path="/courses/*" element={<Courses />}/>
          <Route path="/study/*" element={<Study />}/>
          <Route path="/teach/*" element={<Teaching />}/>
          <Route path="/check/*" element={<Check />}/>
        </Routes>
      </div>
    </div>
  )
};

export default PersonalArea;
