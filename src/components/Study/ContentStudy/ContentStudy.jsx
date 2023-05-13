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

const ContentStudy = () => {
  const {courseId, lessonId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({});
  const {progressCourses} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchProgressCourses());

    const getLesson = async () => (await axios.get(`lessons/${lessonId}`)).data

    getLesson()
      .then(res => setLesson(res));
  }, [lessonId]);

  const handleClickBack = () => {
    const indexCourse = progressCourses.findIndex(course => course.course === courseId);
    const indexLesson = progressCourses[indexCourse].lessonsEnd.findIndex(lesson => lesson === lessonId);

    if (indexLesson - 1 !== -1) return;

    const backCourse = progressCourses[indexCourse].lessonsEnd[indexLesson - 1];

    navigate(`/study/${courseId}/lesson/${backCourse}`);

  };
  const handleClickNext = () => {
    const indexCourse = progressCourses.findIndex(course => course.course === courseId);
    const indexLesson = progressCourses[indexCourse].lessonsEnd.findIndex(lesson => lesson === lessonId);

    if (indexLesson + 1 !== progressCourses.length) return;

    const nextIndex = progressCourses[indexCourse].lessonsEnd[indexLesson + 1];

    navigate(`/study/${courseId}/lesson/${nextIndex}`);
  }

  return (
    <div className={styles.content}>
      <h1>{lesson?.title}</h1>
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
    default:
      return;
  }
}

export default ContentStudy;


