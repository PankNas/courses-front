import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import styles from './Course.module.scss';
import AddLessons from "../../Teaching/AddLessons/AddLessons";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchAuthMe,
  fetchStudentCourses,
  fetchTeachCourses,
  selectIsAuth,
  selectRoleUser
} from "../../../redux/slices/auth";
import cn from 'classnames';
import {pathFolder} from "../../../App";

const Course = ({}) => {
  const {courseId} = useParams();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);
  const {studentCourses} = useSelector(state => state.auth);
  const userRole = useSelector(selectRoleUser);

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

  useEffect(() => {
    dispatch(fetchStudentCourses());

    const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;
    const findCourse = () => studentCourses.find(item => item._id === courseId);

    getCourse()
      .then(res => {
        setDataCourse(res);
        setCurCourse(res);

        userRole === 'moderator' || userRole === 'adm' || findCourse() ? setIsSubscript(true) : setIsSubscript(false);

        if (userRole !== 'moderator') return;

        dispatch(fetchAuthMe());

        const course = data.reviewCourses.find(course => course._id === courseId);

        if (course)
          setIsModerate(true);
      });
  }, []);

  if (!isAuth) {
    return <Navigate to={'/'}/>;
  }

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
      alert('Не далось принять курс на модерацию');
    }
  };

  const handleDelMod = async () => {
    try {
      await axios.delete(`/moderate/${courseId}`);

      setIsModerate(false);
    } catch (err) {
      console.log(err);
      alert('Не далось удалить курс вашего списка');
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

      await axios.patch(`/courses/${courseId}`, fields);

      setIsModerate(false);
      // navigate('/check');
    } catch (err) {
      console.log(err);
      alert('Не далось принять курс на модерацию');
    }
  };

  return (
    <>
      <div className={styles.promo}>
        <div className={cn(styles.container)}>
          <div className={styles.promoContent}>
            <div className={styles.textPromo}>
              <p style={{color: '#fffff', fontSize: '25px'}}>{dataCourse.title}</p>
              <div className={styles.languageBlock}>
                <div className={styles.language}>{dataCourse?.language} язык</div>
                <div className={styles.language}>{dataCourse?.levelLanguage} уровень</div>
              </div>
            </div>
            <img
              src={`http://localhost:8000${dataCourse?.imageUrl}`}
              alt="img-course"
              className={styles.courseImg}
            />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={cn(styles.desc)}>
          <div className={styles.infoCourse}>
            <h2>О курсе</h2>
            <p>{dataCourse?.desc}</p>
            <h2>Программа курса</h2>
            <div>
              {
                dataCourse.modules.map(module =>
                  <div key={module._id} className={styles.module}>
                    <h4 style={{fontWeight: 'bold'}}>{module.title}</h4>
                    <ol>
                      {
                        module.lessons.map(lesson =>
                          <li key={lesson._id} style={{marginLeft: '-25px'}}><p>{lesson.title}</p></li>
                        )
                      }
                    </ol>
                  </div>
                )
              }
            </div>
          </div>

          <div className={styles.manageCourse}>
            {
              isSubscript ?
                <Link to={''}>
                  <button className={styles.button} onClick={handleClickRecord}>
                    Записаться
                  </button>
                </Link>
                :
                <button className={styles.button} onClick={() => {
                }}>
                  Отписаться
                </button>
            }
            {
              userRole === 'moderator' &&
              <>
                {
                  isModerate ?
                    <button className={styles.button} onClick={handleAddMod}>
                      Принять на модерацию
                    </button>
                    :
                    <>
                      <button className={styles.button} onClick={handleOk}>
                        Одобрить
                      </button>
                      <button className={styles.button} onClick={handleDelMod}>
                        Отклонить
                      </button>
                      <button className={styles.button} onClick={() => {
                      }}>
                        Отказаться
                      </button>
                    </>
                }
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};


const Course2 = ({isModerator, isAuth}) => {
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
      alert('Не далось принять курс на модерацию');
    }
  };

  const handleDelMod = async () => {
    try {
      await axios.delete(`/moderate/${courseId}`);

      setIsModerate(false);
    } catch (err) {
      console.log(err);
      alert('Не далось удалить курс вашего списка');
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

      await axios.patch(`/courses/${courseId}`, fields);

      setIsModerate(false);
      navigate('/check');
    } catch (err) {
      console.log(err);
      alert('Не далось принять курс на модерацию');
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
