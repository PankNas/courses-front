import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../../axios";

const TextLesson = ({desc}) => {
  const {courseId, lessonId} = useParams();

  useEffect(() => {
    const getMe = async () => (await axios.get('/auth/me')).data;

    getMe()
      .then(res => {
        const {progressCourses} = res;

        if (progressCourses.course.includes(courseId)) return;

        const fields = {
          course: courseId,
          lesson: lessonId,
        }

        axios.post(`/courses/progress`, fields)
      })
  }, []);

  return (
    <p>{desc}</p>
  )
}

export default TextLesson;
