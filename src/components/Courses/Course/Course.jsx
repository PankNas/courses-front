import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import styles from './Course.module.scss';
import AddLessons from "../../Teaching/AddLessons/AddLessons";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, fetchStudentCourses, fetchTeachCourses} from "../../../redux/slices/auth";

const Course = ({isModerator, isAuth}) => {
  const {courseId} = useParams();
  const navigate = useNavigate();

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
  const [isModerate, setIsModerate] = useState(false);
  const [curCourse, setCurCourse] = useState(null);
  const {data} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const {studentCourses} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchStudentCourses());

    const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;
    const findCourse = () => studentCourses.find(item => item._id === courseId);

    getCourse()
      .then(async res => {
        setDataCourse(res);
        setCurCourse(res);

        isModerator || isAuth || findCourse() ? setIsSubscript(true) : setIsSubscript(false);

        if (!isModerator) return;

        dispatch(fetchAuthMe());

        const course = data.reviewCourses.find(course => course._id === courseId);
        console.log(course);

        if (course)
          setIsModerate(true);

      });
  }, []);

  const handleMove = async () => {
    navigate(`lessons/${curCourse?.modules[0].lessons[0]._id}`);
  };

  const handleClickRecord = async () => {
    try {
      await axios.post('/courses/subscript', {id: courseId});

      setIsSubscript(true);
    } catch (err) {
      console.log(err);
      alert('Не удалось записаться на курс');
    }
  };

  const handleAddMod = async () => {
    try {
      await axios.post('/moderate', {course: courseId});

      setIsModerate(true);
    } catch (err) {
      console.log(err);
      alert('Не далось принять курс на модерацию')
    }
  };

  const handleDelMod = async () => {
    try {
      await axios.delete(`/moderate/${courseId}`);

      setIsModerate(false);
    } catch (err) {
      console.log(err);
      alert('Не далось удалить курс вашего списка')
    }
  };

  const handleOk = async () => {
    try {
      await axios.delete(`/moderate/${courseId}`);

      let fields = {
        countCheck: curCourse.countCheck + 1,
      };

      if (fields.countCheck === 2)
        fields.status = 'active';

      await axios.patch(`/courses/${courseId}`, fields)

      setIsModerate(false);
      navigate('/check')
    } catch (err) {
      console.log(err);
      alert('Не далось принять курс на модерацию')
    }
  }

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
        isSubscript ?
          <Button variant="outlined" onClick={handleMove}>К урокам</Button> :
          <Button variant="outlined" onClick={handleClickRecord}>Записаться</Button>
      }
      {
        isModerator === true &&
        <>
          {
            !isModerate ?
              <Button
                variant="outlined"
                onClick={handleAddMod}
                style={{marginLeft: "15px"}}
              >
                Принять на модерацию
              </Button> :
              <>
                <Button
                  variant="outlined"
                  onClick={handleOk}
                  style={{marginLeft: "15px"}}
                >
                  Одобрить
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleDelMod}
                  style={{marginLeft: "15px"}}
                  color={'error'}
                >
                  Отказаться
                </Button>
              </>
          }
        </>
      }
    </div>
  );
};

export default Course;
