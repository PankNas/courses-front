import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {setFinishLesson} from "./finishLesson";
import ReactMarkdown from "react-markdown";
// import Markdown from 'react-simple-markdown';
import remarkGfm from 'remark-gfm'

const TextLesson = ({desc, isModerate}) => {
  const {courseId, lessonId} = useParams();
  console.log(desc);

  useEffect(() => {
    try {
      if (isModerate) return;

      setFinishLesson(courseId, lessonId).then();
    } catch (err) {
      alert('Ошибка прохождения курса!');
    }
  }, [lessonId]);

  return (
    // <p>{desc}</p>
    <pre><ReactMarkdown children={desc}/></pre>
  );
};

export default TextLesson;
