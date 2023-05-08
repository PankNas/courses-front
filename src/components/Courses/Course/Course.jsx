import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../../axios";
import styles from './Course.module.scss';
import AddLessons from "../../Teaching/AddLessons/AddLessons";

const Course = () => {
  const {courseId} = useParams();

  const [dataCourse, setDataCourse] = useState({
    _id: '',
    title: '',
    desc: '',
    language: '',
    levelLanguage: '',
    imageUrl: '',
    lessons: [],
  });

  useEffect(() => {
    const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;

    getCourse()
      .then(res => {
        setDataCourse(res);
      });
  }, []);

  return (
    <div className={styles.course}>
      <h1>{dataCourse.title}</h1>
      <p>{dataCourse.desc}</p>
      <div className={styles.languageBox}>
        <p>{dataCourse.language}</p>
        <p>{dataCourse.levelLanguage}</p>
      </div>
      <p>Программа курса</p>
      {
        dataCourse.lessons.map(lesson =>
          <>
          </>
        )
      }
    </div>
  );
};

export default Course;
