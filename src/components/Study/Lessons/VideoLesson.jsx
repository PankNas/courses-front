import React, {useEffect} from 'react';
import ReactPlayer from "react-player";
import {useParams} from "react-router-dom";
import axios from "../../../axios";
import {setFinishLesson} from "./finishLesson";

const VideoLesson = ({desc, videoUrl}) => {
  const {courseId, lessonId} = useParams();

  useEffect(() => {
    try {
      setFinishLesson(courseId, lessonId).then();
    } catch (err) {
      alert('Ошибка прохождения курса!')
    }
  }, [lessonId]);

  return (
    <>
      <p>{desc}</p>
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
