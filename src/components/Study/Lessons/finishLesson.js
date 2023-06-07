import axios from "../../../axios";

export const setFinishLesson = async (courseId, lessonId) => {
  console.log('finish', lessonId);
  const {data} = await axios.get('/auth/me');

  const {progressCourses} = data;
  const index = progressCourses.findIndex(elem => elem.course === courseId);
  const indexLesson = progressCourses[index]?.lessonsEnd.includes(lessonId);

  if (indexLesson) return;

  const fields = {
    course: courseId,
    lesson: lessonId,
  };

  axios.post(`/courses/progress`, fields).then();
};
