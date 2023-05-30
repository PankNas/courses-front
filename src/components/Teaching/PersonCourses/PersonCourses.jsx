import React, {useEffect, useState} from 'react';

import styles from './PersonCourses.module.scss';
import Button from "@mui/material/Button";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "../../../axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, fetchTeachCourses, selectIsAuth} from "../../../redux/slices/auth";
import {fetchRemoveCourse} from "../../../redux/slices/courses";
import cn from "classnames";
import {IconButton} from "@mui/material";
import {pathFolder} from "../../../App";
import Avatar from "@mui/material/Avatar";
import {selectFlag, setFlag, setIdCourse} from "../../../redux/slices/lessons";
import Search from "../../Search/Search";

const PersonCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teachCourses = useSelector(state => state.auth.teachCourses);
  const [isChange, setIsChange] = useState(false);

  const [courses, setCourses] = useState(teachCourses);

  useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchTeachCourses());
  }, [isChange]);

  // if (!isAuth) {
  //   return <Navigate to={'/'}/>
  // }

  const handleClickAddCourse = async () => {
    try {
      const {data} = await axios.post("/courses", {});
      // dispatch(setFlag(false));
      // dispatch(setIdCourse(data._id))

      navigate(`/teach/${data._id}/edit/`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании курса');
    }
  };
  const handleDelCourse = (event) => {
    try {
      console.log('del', event.target.id);
      dispatch(fetchRemoveCourse(event.target.id));
      dispatch(fetchTeachCourses());

      // dispatch(fetchRemoveCourse(id));
      // dispatch(fetchAuthMe());
      // dispatch(fetchTeachCourses());
      setIsChange(prev => !prev);
    } catch (err) {
      alert('Не удалось удалить курс')
      console.log(err);
    }
  };

  const setStatus = (status) => {
    let res;

    if (status === 'passive')
      res = 'черновик';
    else if (status === 'check')
      res = 'отправлен на проверку';
    else if (status === 'moderate')
      res = 'на проверке';
    else if (status === 'fail')
      res = 'отклонен';
    else  res = 'одобрен';

    return res;
  };

  const handleClickCheck = async (event, id) => {
    try {
      let course = (await axios.get(`/courses/${id}`)).data;

      course.status = 'check';
      await axios.patch(`/courses/${course._id}`, course);
      dispatch(fetchTeachCourses());
    } catch (err) {
      console.log(err);
      alert('Не удалось отправить курс на модерацию');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 style={{margin: '0', marginRight: '10px'}}>Мои курсы</h1>
        <IconButton
          onClick={handleClickAddCourse}
          className={styles.addCourse}
        >
          <Avatar src={`${pathFolder}/my/add.svg`}/>
        </IconButton>
      </div>

      <Search
        items={teachCourses}
        setCourses={setCourses}
      />

      <div className={styles.catalog}>
        {
          courses?.map((item, index) =>
            <div key={item._id} className={styles.courseCard}>
              <div>
                <h3>{item.title}</h3>
                <h4>Статус: {setStatus(item.status)}</h4>
                <div className={styles.buttons}>
                  <Link to={`${item._id}/edit`}>
                    <button
                      className={styles.button}
                    >
                      К курсу
                    </button>
                  </Link>
                  {
                    (item?.status === 'passive') &&
                    <button
                      onClick={(event) => handleClickCheck(event, item._id)}
                      className={styles.button}
                    >
                      Опубликовать
                    </button>
                  }
                  <button
                    onClick={handleDelCourse}
                    className={cn(styles.button, styles.delButton)}
                    id={item._id}
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <img
                className={styles.img}
                src={`http://localhost:8000${item.imageUrl}`} alt="img"
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default PersonCourses;
