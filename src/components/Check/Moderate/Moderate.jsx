import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import CatalogAll from "../../Catalogs/CatalogAll";
import {fetchCourses} from "../../../redux/slices/courses";
import Course from "../../Courses/Course/Course";
import CourseStudy from "../../Study/CourseStudy/CourseStudy";

const Moderate = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.courses);
  const {data} = useSelector(state => state.auth);

  useEffect(() => {
    // dispatch(fetchAuthMe())
    dispatch(fetchCourses());
  }, []);

  const getActive = () => {
    const checkReviewers = (item) => item.find(reviewer => reviewer._id !== data?._id)

    // dispatch(fetchCourses());
    return items?.filter(item =>
      (item.status === 'check' || item.status === 'moderate') &&
      item.reviewers.length < 2 &&
      !checkReviewers(item?.reviewers) &&
      item?.user?._id !== data?._id
    );
  };

  return (
    <Routes>
      <Route path={'/*'} element={
        <CatalogAll items={getActive()} title={'Курсы на модерацию'} isModerate={true}/>
      }
      />
      <Route path={'/:courseId/*'} element={<Course isModerator={true}/>}/>
      <Route path={'/:courseId/lessons/*'} element={<CourseStudy isModerate={true}/>} />
    </Routes>
  );
};

export default Moderate;
