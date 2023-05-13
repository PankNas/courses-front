import React, {useEffect, useState} from 'react';

import styles from './ContentStudy.module.scss';
import TextLesson from "../Lessons/TextLesson";
import VideoLesson from "../Lessons/VideoLesson";
import SentenceLesson from "../Lessons/SentenceLesson";
import {useParams} from "react-router-dom";
import axios from "../../../axios";

const ContentStudy = () => {
  const {lessonId} = useParams();

  const [lesson, setLesson] = useState({});

  useEffect(() => {
    const getLesson = async () => (await axios.get(`lessons/${lessonId}`)).data

    getLesson()
      .then(res => setLesson(res));
  }, [lessonId]);

  return (
    <div className={styles.content}>
      <h1>{lesson?.title}</h1>
      {typeContent(lesson)}
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
    default:
      return;
  }
}

export default ContentStudy;


