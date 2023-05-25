import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {setFinishLesson} from "./finishLesson";

const TextLesson = ({desc, isModerate}) => {
  const {courseId, lessonId} = useParams();

  useEffect(() => {
    try {
      if (isModerate) return;

      setFinishLesson(courseId, lessonId).then();
    } catch (err) {
      alert('Ошибка прохождения курса!');
    }
  }, [lessonId]);

  return (
    <p>{desc}</p>
  );
};

export default TextLesson;
