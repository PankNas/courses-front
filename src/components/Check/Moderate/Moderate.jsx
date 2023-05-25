import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import CatalogAll from "../../Catalogs/CatalogAll";
import {selectIsAuth} from "../../../redux/slices/auth";
import {fetchCourses} from "../../../redux/slices/courses";
import Course from "../../Courses/Course/Course";

const Moderate = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.courses);
  const {data} = useSelector(state => state.auth);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  // if (!isAuth) {
  //   return <Navigate to={'/'}/>;
  // }

  const getActive = () => {
    return items?.filter(item => item.status === 'check' && item?.user?._id !== data?._id);
  };

  return (

    <Routes>
      <Route path={'/'} element={
        // <Catalog title={'Каталог курсов'} items={getActive()} isProgress={false}/>
        <CatalogAll items={getActive()} title={'Курсы на модерацию'}/>
      }
      />
      {/*<Route path={'/:courseId/*'} element={<Course isModerator={true}/>}/>*/}
    </Routes>
  );
};

export default Moderate;
