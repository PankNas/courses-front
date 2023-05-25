import React, {useEffect, useState} from 'react';

import styles from './ContentStudy.module.scss';
import TextLesson from "../Lessons/TextLesson";
import VideoLesson from "../Lessons/VideoLesson";
import SentenceLesson from "../Lessons/SentenceLesson";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchProgressCourses} from "../../../redux/slices/auth";
import TranslateLesson from "../Lessons/TranslateLesson";
import TestLesson from "../Lessons/TestLesson";
import PassesLesson from "../Lessons/PassesLesson";
import Remark from "../../Remark/Remark";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../../App";
import {IconButton} from "@mui/material";

const ContentStudy = ({isModerate}) => {
  const {courseId, lessonId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({});
  const {progressCourses} = useSelector(state => state.auth);

  useEffect(() => {
    // dispatch(fetchProgressCourses());

    const getLesson = async () => (await axios.get(`lessons/${lessonId}`)).data

    getLesson()
      .then(res => {
        console.log(res);
        setLesson(res);
      });
  }, [lessonId]);

  const handleClickBack = async () => {
    const course = (await axios.get(`courses/${courseId}`)).data;
    const lessons = course.modules.flatMap(module => module.lessons);

    const indexLesson = lessons.findIndex(lesson => lesson._id === lessonId);

    if (indexLesson === 0) return;

    if (isModerate) {
      navigate(`/check/${courseId}/lessons/${lessons[indexLesson - 1]._id}`);
      return;
    }

    navigate(`/study/${courseId}/lessons/${lessons[indexLesson - 1]._id}`);
  };
  const handleClickNext = async () => {
    const course = (await axios.get(`courses/${courseId}`)).data;
    const lessons = course.modules.flatMap(module => module.lessons);

    const indexLesson = lessons.findIndex(lesson => lesson._id === lessonId);

    if (indexLesson === lessons.length - 1) return;

    if (isModerate) {
      navigate(`/check/${courseId}/lessons/${lessons[indexLesson + 1]._id}`);
      return;
    }

    dispatch(fetchProgressCourses());

    const progress = progressCourses.find(course => course.course === courseId);
    let nextLesson = progress.lessonsEnd.find(lesson => lesson === lessons[indexLesson + 1]._id);

    if (!nextLesson) {
      const lastLessonId = progress.lessonsEnd[progress.lessonsEnd.length - 1];
      const lastLessonIndex = lessons.findIndex(lesson => lesson._id === lastLessonId);

      if (indexLesson + 1 - lastLessonIndex !== 1) return;

      nextLesson = lessons[indexLesson + 1]._id;
    }

    navigate(`/study/${courseId}/lessons/${nextLesson}`);
  }

  const handleSaveRemark = async (text) => {
    try {
      await axios.patch(`/remarks/course/${courseId}/lesson/${lessonId}`, {text: text});

      alert('Замечание сохранено');
    } catch (err) {

    }
  }

  const handleDelRemark = async () => {
    try {
        await axios.delete(`/remarks/course/${courseId}/lesson/${lessonId}`);

      alert('Замечание удалено');
    } catch (err) {

    }
  }

  return (
    <div className={styles.content}>
      <div>
        <h2>{lesson?.title}</h2>
        {typeContent(lesson, isModerate)}
        <div className={styles.navigation}>
          <IconButton
            onClick={handleClickBack}
          >
            <Avatar src={`${pathFolder}/my/arrow_back.svg`}/>
          </IconButton>
          <IconButton
            onClick={handleClickNext}
          >
            <Avatar src={`${pathFolder}/my/arrow_forward.svg`}/>
          </IconButton>
        </div>
      </div>

      {
        isModerate &&
        <div className={styles.remark}><Remark fnSave={handleSaveRemark} fnDelete={handleDelRemark} rowsCount={5}/></div>
      }
    </div>
  )
}

function typeContent(lesson, isModerate) {
  switch (lesson?.type) {
    case 'text':
      return <TextLesson desc={lesson.desc} isModerate={isModerate}/>;
    case 'video':
      return <VideoLesson desc={lesson.desc} videoUrl={lesson.videoUrl} isModerate={isModerate}/>;
    case 'sentence':
      return <SentenceLesson sentence={lesson.sentence} translate={lesson.translate} isModerate={isModerate}/>
    case 'translate':
      return <TranslateLesson question={lesson.question} options={lesson.options} answer={lesson.answer} isModerate={isModerate}/>
    case 'test':
      return <TestLesson items={lesson.itemsTest} totalScore={lesson.totalScore} isModerate={isModerate}/>
    case 'passes':
      const parts = lesson.sentence.split(/\[(.*?)\]/g);
      const size = Math.trunc(parts.length / 2);

      const [options, answers] = setParamsPasses(lesson.sentence);

      return <PassesLesson sentence={lesson.sentence} size={size} options={options} answers={answers} isModerate={isModerate}/>;
    default:
      return;
  }
}

function setParamsPasses(sentence) {
  const parts = sentence.match(/\[(.*?)\]/g);

  let options = [];
  let answers = [];

  parts.forEach((elem) => {
    const values = elem.split(',').map(item => item.trim().replace(/\[|]/g, ''));

    answers.push(values[0]);
    options.push(values.sort(() => Math.random() - 0.5));
  })

  return [options, answers];
}

export default ContentStudy;


