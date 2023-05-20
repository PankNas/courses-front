import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../../axios";
import styles from './Course.module.scss';
import AddLessons from "../../Teaching/AddLessons/AddLessons";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentCourses, fetchTeachCourses} from "../../../redux/slices/auth";

const Course = () => {
  const {courseId} = useParams();

  const [dataCourse, setDataCourse] = useState({
    _id: '',
    title: '',
    desc: '',
    language: '',
    levelLanguage: '',
    imageUrl: '',
    modules: [],
  });
  const [isSubscript, setIsSubscript] = useState(false);

  const dispatch = useDispatch();
  const {studentCourses} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchStudentCourses());

    const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;
    const findCourse = () => studentCourses.find(item => item._id === courseId);

    getCourse()
      .then(res => {
        setDataCourse(res);

        findCourse() ? setIsSubscript(true) : setIsSubscript(false);
      });
  }, []);

  const handleClickRecord = async () => {
    try {
      const {data} = await axios.post('/courses/subscript', {id: courseId});

      setIsSubscript(true);
    } catch (err) {
      console.log(err);
      alert('Не удалось записаться на курс');
    }
  };

  return (
    <div className={styles.course}>
      <h1>{dataCourse.title}</h1>
      <img
        className={styles.courseImg}
        src={`http://localhost:8000${dataCourse.imageUrl}`}
        alt="img"
      />
      <p>{dataCourse.desc}</p>
      <p>Язык: {dataCourse.language}</p>
      <p>Уровень: {dataCourse.levelLanguage}</p>
      <p>Программа курса</p>
      <ol style={{marginBottom: '15px'}}>
        {
          dataCourse.modules.map(module =>
            <li key={module._id} style={{marginBottom: "8px"}}>
              {module.title}
              <ol>
                {module.lessons.map(lesson => <li key={lesson._id}>{lesson.title}</li>)}
              </ol>
            </li>
          )
        }
      </ol>
      {
        isSubscript ? <p>Вы записаны на курс</p> :
          <Button variant="outlined" onClick={handleClickRecord}>Записаться</Button>
      }
    </div>
  );
};

export default Course;
