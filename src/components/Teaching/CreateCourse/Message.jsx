import React, {useEffect, useState} from 'react';
import styles from './CreateCourse.module.css';
import {useParams} from "react-router-dom";
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
      {
        course.status !== 'fail' ?
          <p>Сообщений нет</p>:
          <div>Что то будет позже</div>
      }
    </div>
  )
};

export default Message;
