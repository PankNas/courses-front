import React, {useEffect} from 'react';

import styles from './ContentStudy.module.scss';
import TextLesson from "../Lessons/TextLesson";
import VideoLesson from "../Lessons/VideoLesson";
import SentenceLesson from "../Lessons/SentenceLesson";

const ContentStudy = ({lesson}) => {


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


