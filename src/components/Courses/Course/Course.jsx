import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import styles from './Course.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {
  fetchAuthMe,
  fetchStudentCourses,
  selectIsAuth,
} from "../../../redux/slices/auth";
import cn from 'classnames';
import Remark from "../../Remark/Remark";
import AddComment from "../../Comments/AddComment";
import CommentsBlock from "../../Comments/CommentsBlock";
import {fetchCourses} from "../../../redux/slices/courses";
import {IconButton} from "@mui/material";
import {pathFolder} from "../../../App";
import Score from "../../Score/Score";
import {setLanguage, setLevel} from "../../../redux/slices/lessons";
import ReactMarkdown from "react-markdown";

const Course = ({isModerator, isStudy = false}) => {
  const {courseId} = useParams();
  const navigate = useNavigate();

  const {studentCourses} = useSelector(state => state.auth);

  const [dataCourse, setDataCourse] = useState({
    _id: '',
    title: '',
    desc: '',
    language: '',
    levelLanguage: '',
    imageUrl: '',
    comments: [],
    modules: [],
    scores: [],
  });

  const [isSubscript, setIsSubscript] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModerate, setIsModerate] = useState(false);
  const [curCourse, setCurCourse] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [score, setScore] = useState(0);

  const {data} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const countMiddleScore = () => {
    // console.log('hy');
    setIsUpdate(prev => !prev)
  }

  useEffect(() => {
    dispatch(fetchStudentCourses());
    dispatch(setLevel(''))
    dispatch(setLanguage(''))

    const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;
    const findCourse = () => studentCourses?.find(item => item._id === courseId);

    getCourse()
      .then(res => {
        setDataCourse(res);
        setCurCourse(res);

        if (res.user._id === data?._id) {
          setIsAuthor(true);
          return;
        }

        const curScore = res?.scores.reduce((acc, elem) => acc + elem.score, 0) / res?.scores.length || 0;
        // console.log(curScore, res);
        setScore(curScore.toFixed(1));

        (findCourse() && !isModerator) ? setIsSubscript(true) : setIsSubscript(false);

        if (!isModerator) return;

        dispatch(fetchAuthMe());

        const course = data?.reviewCourses.find(course => course._id === courseId);
        if (course) {
          setIsModerate(true);
        }

        // countMiddleScore()
      });
  }, [isModerate, isSubscript, isUpdate]);

  const updateComments = () => {
    setIsUpdate(prev => !prev);
  };

  const handleClickRecord = async () => {
    try {
      await axios.post('/courses/subscript', {id: courseId});

      setIsSubscript(true);
      alert('Вы записаны на курс');
    } catch (err) {
      console.log(err);
      alert('Не удалось записаться на курс');
    }
  };

  const handleClickDel = async () => {
    if (!window.confirm('Вы уверены, что хотите отписаться от курса?')) return;

    try {
      await axios.delete(`/courses/subscript/${courseId}`);
      setIsSubscript(false);
      dispatch(fetchStudentCourses());
    } catch (err) {
      console.log(err);
      console.warn('Не удалось отписаться от курса');
    }
  };

  const handleAddMod = async () => {
    try {
      await axios.post('/moderate', {course: courseId});
      await axios.patch(`/courses/${courseId}`, {...curCourse, status: 'moderate', reviewer: data?._id});

      setIsModerate(true);
      alert('Вы стали модератором курса');
    } catch (err) {
      console.log(err);
      alert('Не далось принять курс на модерацию');
    }
  };

  const handleDelMod = async () => {
    try {
      await axios.delete(`/moderate/${courseId}`);
      await axios.patch(`/courses/${courseId}`, {...curCourse, status: 'check', reviewer: data?._id});
      dispatch(fetchAuthMe());

      setIsModerate(false);
      alert('Вы отписаны от проверки курса');
    } catch (err) {
      console.log(err);
      alert('Не далось удалить курс вашего списка');
    }
  };

  const handleOk = async () => {
    try {
      await axios.delete(`/moderate/${courseId}`);
      dispatch(fetchAuthMe());

      await axios.patch(`/courses/${courseId}`, {...curCourse, status: 'active'});

      setIsModerate(false);
      dispatch(fetchCourses());
      navigate('/moderate');
      alert('Курс одобрен');
    } catch (err) {
      console.log(err);
      alert('Не далось одобрить курс');
    }
  };

  const handleSave = async (text) => {
    try {
      await axios.patch(`/remarks/course/${courseId}`, {remarkForCourse: text, reviewer: data?._id});

      alert('Замечание сохранено');
    } catch (err) {

    }
  };

  const handleDelRemark = async () => {
    try {
      await axios.delete(`/remarks/course/${courseId}`);

      alert('Замечание удалено');
    } catch (err) {

    }
  };

  const handleReject = async () => {
    try {
      await axios.delete(`/moderate/${courseId}`);
      dispatch(fetchAuthMe());

      await axios.patch(`/courses/${courseId}`, {...curCourse, status: 'fail'});

      setIsModerate(false);
      dispatch(fetchCourses());
      navigate('/moderate');

      alert('Вы отклонили курс на размещение на платформе');
    } catch (err) {

    }
  };

  const onClickLanguage = (event) => {
    console.log(event.target);
    dispatch(setLanguage(event.target.id))

    navigate('/catalog')
  }

  const onClickLevel = (event) => {
    dispatch(setLevel(event.target.id))
    navigate('/catalog')
  }

  const toLesson = async () => {
    const course_ = (await axios.get(`/courses/${courseId}`)).data;
    const user = (await axios.get(`/auth/me`)).data;
    console.log(course_);

    if (isModerator) {
      navigate(`/check/${courseId}/lessons/${course_.modules[0].lessons[0]._id}`)
      return;
    }

    if (isAuthor) {
      navigate(`/study/${courseId}/lessons/${course_.modules[0].lessons[0]._id}`)
      return;
    }

    const curCourse = user?.progressCourses.find(course => course.course === courseId);

    const lastLesson = curCourse?.lessonsEnd.at(-1) || course_.modules[0].lessons[0]._id;

    navigate(`/study/${courseId}/lessons/${lastLesson}`)
  }

  return (
    <>
      <div className={styles.promo}>
        <div className={cn(styles.container)}>
          <div className={styles.promoContent}>
            <div className={styles.textPromo}>
              <p style={{color: '#fffff', fontSize: '25px'}}>{dataCourse.title}</p>

              <div className={styles.languageBlock}>
                <img className={styles.languageBlockImg} src={`${pathFolder}/my/star_fill.svg`} alt="score"/>
                <p className={styles.languageText}>{score}</p>
                <img className={styles.languageBlockImg} src={`${pathFolder}/my/translate.svg`} alt="language"/>
                {/*<Link className={styles.link} onClick={onClickLanguage} to={'/catalog'}>*/}
                  <p
                    id={dataCourse?.language}
                    className={styles.languageText}
                    onClick={onClickLanguage}
                    style={{textDecoration: 'underline'}}
                  >
                    {dataCourse?.language}
                  </p>
                {/*</Link>*/}
                <img className={styles.languageBlockImg} src={`${pathFolder}/my/level.svg`} alt="level"/>
                {/*<Link className={styles.link} onClick={onClickLevel} to={'/catalog'}>*/}
                  <p
                    id={dataCourse?.levelLanguage}
                    className={styles.languageText}
                    onClick={onClickLevel}
                    style={{textDecoration: 'underline'}}
                  >
                    {dataCourse?.levelLanguage}
                  </p>
                {/*</Link>*/}
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
            <div>
              <ReactMarkdown children={dataCourse?.desc}/>
            </div>
            {/*<p>{dataCourse?.desc}</p>*/}
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

            {
              isStudy &&
              <CommentsBlock
                items={dataCourse?.comments}
                isLoading={false}
                fnUpdate={updateComments}
              >
                {(isSubscript || isAuthor) && <AddComment fnUpdate={updateComments}/>}
              </CommentsBlock>
            }
          </div>

          <div className={styles.manageCourse}>
            {
              (isAuthor || isModerator || isSubscript) &&
              // <Link to={isModerator ? `/check/${courseId}/lessons` : `/study/${courseId}/lessons`}>
                <button className={styles.button} onClick={toLesson}>
                  К урокам
                </button>
              // </Link>
            }
            {
              (!isSubscript && !isAuthor && !isModerator) &&
              // <Link to={''}>
                <button className={styles.button} onClick={handleClickRecord}>
                  Записаться
                </button>
              // </Link>
            }
            {
              isSubscript &&
              <>
                <button className={styles.button} onClick={handleClickDel}>
                  Отписаться
                </button>
                <div className={styles.score}>
                  <p style={{margin: '0'}}>Оцените курс</p>
                  <Score fnUpdateScore={countMiddleScore}/>
                </div>
              </>
            }
            {
              isModerator &&
              <>
                {
                  !isModerate ?
                    <button className={styles.button} onClick={handleAddMod}>
                      Принять на модерацию
                    </button>
                    :
                    <div style={{marginBottom: '20px'}}>
                      <button className={styles.button} style={{marginBottom: '20px'}} onClick={handleDelMod}>
                        Отказаться
                      </button>
                      <button className={cn(styles.button, styles.buttonSuccess)} onClick={handleOk}>
                        Одобрить
                      </button>
                      <button className={cn(styles.button, styles.buttonFail)} onClick={handleReject}>
                        Отклонить
                      </button>
                      <Remark id={data?._id} fnSave={handleSave} fnDelete={handleDelRemark} isCourse={true}
                              rowsCount={5}/>
                    </div>
                }
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
