import React, {useEffect, useRef, useState} from 'react';

import styles from './CreateCourse.module.css';
import {Navigate, NavLink, Outlet, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../../redux/slices/auth";
import ContentNewCourse from "./ContentNewCourse";
import Message from "./Message";
import {
  selectFlag, setDataCourse,
  setDescCourse, setFlag,
  setImageUrlCourse,
  setLanguageCourse, setLevelLanguageCourse,
  setTitleCourse
} from "../../../redux/slices/lessons";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../../App";
import {IconButton} from "@mui/material";
import TextField from "@mui/material/TextField";
import SelectItem from "../../SelectItem";
import {languages, levelLanguages} from "./helper";
import AddLessons from "../AddLessons/AddLessons";
import axios from "../../../axios";

const CreateCourse = () => {
  const {id} = useParams();
  const isAuth = useSelector(selectIsAuth);
  const flag = useSelector(selectFlag);
  const {course} = useSelector(state => state.lessons);

  const dispatch = useDispatch();
  const {modules} = useSelector(state => state.lessons);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [language, setLanguage] = useState('');
  const [levelLanguage, setLevelLanguage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const inputFileRef = useRef(null);

  useEffect(() => {
    const getCourse = async () => (await axios.get(`/courses/${id}`)).data;

    getCourse()
      .then(res => {
        setTitle(res.title === '' ? course.title : res.title);
        setDesc(res.desc === '' ? course.desc : res.desc);
        setLevelLanguage(res.levelLanguage === '' ? course.levelLanguage : res.levelLanguage);
        setLanguage(res.language === '' ? course.language : res.language);
        setImageUrl(res.imageUrl === '' ? course.imageUrl : res.imageUrl);
      });

    // return () => {
    //   setImageUrl('');
    //   setLanguage('');
    //   setLevelLanguage('');
    // };
  }, []);

  if (!isAuth) {
    return <Navigate to={'/'} />
  }

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();

      formData.append("file", event.target.files[0]);

      const {data} = await axios.post("/upload", formData);

      setImageUrl(data.url.slice(4));
      dispatch(setImageUrlCourse(data.url.slice(4)))
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла!");
    }
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'name-course':
        dispatch(setTitleCourse(event.target.value))
        return setTitle(event.target.value);
      case 'desc-course':
        dispatch(setDescCourse(event.target.value))
        return setDesc(event.target.value);
      case 'languages':
        dispatch(setLanguageCourse(event.target.value))
        return setLanguage(event.target.value);
      case 'levelLanguages':
        dispatch(setLevelLanguageCourse(event.target.value))
        return setLevelLanguage(event.target.value);
      default:
        break;
    }
  };
  const handleDelBtn = () => {
    dispatch(setImageUrlCourse(''));
    setImageUrl('');
  };

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        imageUrl,
        desc,
        language,
        levelLanguage,
        status: 'passive'
      };

      // modules.forEach(async module => await axios.patch(`/modules/${module._id}`, module));
      for (const module of modules) {
        await axios.patch(`/modules/${module._id}`, module);
      }

      await axios.patch(`/courses/${id}`, fields);

      dispatch(setFlag(true))

      dispatch(setDataCourse({
        title: '',
        desc: '',
        language: '',
        levelLanguage: '',
        imageUrl: '',
      }))

      navigate('/teach');
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании курса');
    }
  };

  const onCancel = async () => {
    if (!flag) {
      await axios.delete(`/courses/${id}`);
    }
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <h1>Мой курс</h1>

      <nav className={styles.navigate}>
        <NavLink
          to={`/teach/${id}/edit`}
          className={({isActive}) => styles.link + (isActive ? styles.linkActive : '')}
        >
          Содержание
        </NavLink>
        <NavLink
          className={({isActive}) => styles.link + (isActive ? styles.linkActive : '')}
          to={`/teach/${id}/message`}
        >
          Ответ модератора
        </NavLink>
      </nav>

      <div className={styles.content}>
        <div className={styles.imgBlock}>
          <div>
            <button
              onClick={() => inputFileRef.current.click()}
              style={{marginRight: '15px'}}
              className={styles.button}
            >
              Загрузить превью
            </button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
          </div>
          {imageUrl && (
            <>
              {
                imageUrl !== '' ?
                  <img
                    className={styles.image}
                    src={`http://localhost:8000${imageUrl}`}
                    alt="Uploaded"
                  /> :
                  <Avatar src={`${pathFolder}/my/backAvaCourse.jpg`}/>
              }
              <IconButton style={{padding: '0'}} onClick={handleDelBtn}>
                <Avatar src={`${pathFolder}/my/delete.svg`}/>
              </IconButton>
            </>
          )}
        </div>

        <div style={{width: '750px'}}>
          <TextField
            id={'name-course'}
            value={title}
            label="Название курса"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            style={{marginBottom: '20px', marginTop: '20px'}}
            required
          />
          <TextField
            id={'desc-course'}
            value={desc}
            label="Описание курса"
            multiline
            rows={4}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            style={{marginBottom: '20px'}}
            required
          />
          <div className={styles.block}>
            <p style={{marginTop: '0'}}>Языковая группа</p>
            <div className={styles.selectors}>
              <SelectItem
                value={language}
                id={'languages'}
                options={languages}
                onChange={handleChange}
                style={{width: '360px'}}
              />
              <SelectItem
                value={levelLanguage}
                id={'levelLanguages'}
                options={levelLanguages}
                onChange={handleChange}
                style={{width: '360px'}}
              />
            </div>
          </div>

          <AddLessons/>

          <div style={{display: "flex", justifyContent: 'center'}}>
            <button
              className={styles.button}
              onClick={onSubmit}
              style={{marginRight: '15px'}}
            >
              Сохранить
            </button>
            <button className={styles.button} onClick={onCancel}>Отмена</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
