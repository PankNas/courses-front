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
      navigate(`/check/${courseId}/lesson/${lessons[indexLesson - 1]._id}`);
      return;
    }

    navigate(`/study/${courseId}/lesson/${lessons[indexLesson - 1]._id}`);
  };
  const handleClickNext = async () => {
    const course = (await axios.get(`courses/${courseId}`)).data;
    const lessons = course.modules.flatMap(module => module.lessons);

    const indexLesson = lessons.findIndex(lesson => lesson._id === lessonId);

    if (indexLesson === lessons.length - 1) return;

    if (isModerate) {
      navigate(`/check/${courseId}/lesson/${lessons[indexLesson + 1]._id}`);
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

    navigate(`/study/${courseId}/lesson/${nextLesson}`);
  }

  return (
    <div className={styles.content}>
      <div>
        <h2>{lesson?.title}</h2>
        {typeContent(lesson)}
        <div className={styles.navigation}>
          <Button
            variant={'outlined'}
            onClick={handleClickBack}
          >
            {'<--'}
          </Button>
          <Button
            variant={'outlined'}
            onClick={handleClickNext}
          >
            {'-->'}
          </Button>
        </div>
      </div>

      {
        isModerate && <div className={styles.remark}><Remark rowsCount={5}/></div>
      }
    </div>
  )
}

function typeContent(lesson) {
  switch (lesson?.type) {
    case 'text':
      return <TextLesson desc={lesson.desc}/>;
    case 'video':
      return <VideoLesson desc={lesson.desc} videoUrl={lesson.videoUrl}/>;
    case 'sentence':
      return <SentenceLesson sentence={lesson.sentence} translate={lesson.translate}/>
    case 'translate':
      return <TranslateLesson question={lesson.question} options={lesson.options} answer={lesson.answer}/>
    case 'test':
      return <TestLesson items={lesson.itemsTest} totalScore={lesson.totalScore}/>
    case 'passes':
      const parts = lesson.sentence.split(/\[(.*?)\]/g);
      const size = Math.trunc(parts.length / 2);

      const [options, answers] = setParamsPasses(lesson.sentence);

      return <PassesLesson sentence={lesson.sentence} size={size} options={options} answers={answers}/>;
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


