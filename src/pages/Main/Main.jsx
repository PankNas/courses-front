import React from 'react';

import styles from './Main.module.css'

import Menu from "../../components/Menu/Menu";
import {Route, Routes} from "react-router-dom";
import Home from "../../components/Home/Home";
import Courses from "../../components/Courses/Courses";
import {Container} from "@mui/material";

const Main = () => {
  return (
    <div className={styles.root}>
      <Menu />

      <Container style={{width: "83%"}}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/courses" element={<Courses />}/>
        </Routes>
      </Container>
    </div>
  )
};

export default Main;
