import React, {useEffect} from 'react';
import ReactPlayer from "react-player";
import {useParams} from "react-router-dom";
import {setFinishLesson} from "./finishLesson";
import ReactMarkdown from "react-markdown";

const VideoLesson = ({desc, videoUrl, isModerate}) => {
  const {courseId, lessonId} = useParams();

  useEffect(() => {
    try {
      if (isModerate) return;

      setFinishLesson(courseId, lessonId).then();
    } catch (err) {
      alert('Ошибка прохождения курса!')
    }
  }, [lessonId]);

  return (
    <>
      <pre><ReactMarkdown children={desc}/></pre>
      {/*<p>{desc}</p>*/}
      <ReactPlayer
        url={`${videoUrl}`}
        controls={true}
        width="100%"
        height="400px"
        style={{marginBottom: '20px', marginTop: '20px'}}
      />
    </>
  )
}

export default VideoLesson;
