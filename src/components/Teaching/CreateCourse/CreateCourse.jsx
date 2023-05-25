import React, {useEffect, useRef, useState} from 'react';

import styles from './CreateCourse.module.css';
import {Navigate, NavLink, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../../redux/slices/auth";
import ContentNewCourse from "./ContentNewCourse";
import Message from "./Message";

const CreateCourse = () => {
  const {id} = useParams();
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <div className={styles.container}>
      <h1>Мой курс</h1>

      <nav className={styles.navigate}>
        <NavLink
          to={`/teach/${id}/edit`}
          className={({isActive}) => styles.link + (isActive ? styles.linkActive : '')}
        >
          <h3>Содержание</h3>
        </NavLink>
        <NavLink
          className={({isActive}) => styles.link + (isActive ? styles.linkActive : '')}
          to={'message'}
        >
          <h3>Ответ модератора</h3>
        </NavLink>
      </nav>

      <div>
        <Routes>
          <Route path={'/*'} element={<ContentNewCourse />}/>
          <Route path={'/message'} element={<Message />}/>
        </Routes>
      </div>
    </div>
  );
};

export default CreateCourse;
