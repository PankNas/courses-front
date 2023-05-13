import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {setFinishLesson} from "./finishLesson";

const TextLesson = ({desc}) => {
  const {courseId, lessonId} = useParams();

  useEffect(() => {
    try {
      setFinishLesson(courseId, lessonId).then();
    } catch (err) {
      alert('Ошибка прохождения курса!');
    }
  }, []);

  return (
    <p>{desc}</p>
  );
};

export default TextLesson;
