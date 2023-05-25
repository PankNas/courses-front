import React, {useEffect, useState} from 'react';
import styles from './CreateCourse.module.css';
import {NavLink, useParams} from "react-router-dom";
import axios from "../../../axios";

const Message = () => {
  const {id} = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourse = async () => (await axios.get(`/courses/${id}`)).data;

    getCourse()
      .then(res => {
        setCourse(res);
      })
  }, []);

  return (
    <div className={styles.container}>
      <h1>Мой курс</h1>

      <nav className={styles.navigate}>
        <NavLink
          to={`/teach/${id}/edit`}
          className={({isActive}) => styles.link + (isActive ? styles.linkActive : '')}
        >
          Содержание
        </NavLink>
        <NavLink
          className={({isActive}) => styles.link + (isActive ? styles.linkActive : '')}
          to={`/teach/${id}/message`}
        >
          Ответ модератора
        </NavLink>
      </nav>
      {
        course?.status !== 'fail' ?
          <p>Сообщений нет</p>:
          <div>Что то будет позже</div>
      }
    </div>
  )
};

export default Message;
