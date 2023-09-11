import React, {useEffect, useRef, useState} from 'react';

import styles from './CreateCourse.module.css';
import {Navigate, NavLink, Outlet, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth} from "../../../redux/slices/auth";

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
import {languages, levelLanguages} from "../../languages";
import AddLessons from "../AddLessons/AddLessons";
import axios from "../../../axios";
import Remark from "../../Remark/Remark";
import RemarkTeach from "../Samples/RemarkTeach";

const CreateCourse = () => {
  const {id} = useParams();
  const isAuth = useSelector(selectIsAuth);
  const flag = useSelector(selectFlag);
  // const {course} = useSelector(state => state.lessons);
  const [course, setCourse] = useState(null);

  const dispatch = useDispatch();
  const {modules} = useSelector(state => state.lessons);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [language, setLanguage] = useState('');
  const [levelLanguage, setLevelLanguage] = useState('');
  const [imageUrl, setImageUrl] = useState(undefined);

  const navigate = useNavigate();

  const inputFileRef = useRef(null);

  useEffect(() => {
    const getCourse = async () => (await axios.get(`/courses/${id}`)).data;

    getCourse()
      .then(res => {
        setCourse(res);

        setTitle(res.title);
        setDesc(res.desc);
        setLevelLanguage(res.levelLanguage);
        setLanguage(res.language);
        setImageUrl(res.imageUrl);
      });
  }, []);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();

      formData.append("file", event.target.files[0]);

      const {data} = await axios.post("/upload", formData);

      setImageUrl(data.url.slice(4));
      dispatch(setImageUrlCourse(data.url.slice(4)));
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла!");
    }
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'name-course':
        // dispatch(setTitleCourse(event.target.value));
        return setTitle(event.target.value);
      case 'desc-course':
        // dispatch(setDescCourse(event.target.value));
        return setDesc(event.target.value);
      case 'languages':
        // dispatch(setLanguageCourse(event.target.value));
        return setLanguage(event.target.value);
      case 'levelLanguages':
        // dispatch(setLevelLanguageCourse(event.target.value));
        return setLevelLanguage(event.target.value);
      default:
        break;
    }
  };
  const handleDelBtn = () => {
    // dispatch(setImageUrlCourse(''));
    setImageUrl(undefined);
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

      navigate('/teach');
    } catch (err) {
      console.warn(err);

      alert('Ошибка при сохранении данных');
    }
  };

  const onCancel = async () => {
    navigate('/teach');
  };

  return (
    <div className={styles.container}>
      <h1>Мой курс</h1>
      <div className={styles.content}>
        <div className={styles.imgBlock}>
          <div>
            <button
              onClick={() => inputFileRef.current.click()}
              style={{marginRight: '15px', width: '100%'}}
              className={styles.button}
            >
              Загрузить превью
            </button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
          </div>
          {/*{!imageUrl && <Avatar src={`${pathFolder}/my/backAvaCourse.jpg`}/>}*/}
          {imageUrl && (
            <>
              <img
                className={styles.image}
                src={`http://localhost:8000${imageUrl}`}
                alt="Uploaded"
              />
              <IconButton style={{padding: '0', textAlign: 'center'}} onClick={handleDelBtn}>
                <Avatar src={`${pathFolder}/my/delete.svg`}/>
              </IconButton>
            </>
          )}
          {
            (course?.status !== 'check' || course?.status !== 'moderate') && setRemarks(course?.remarkForCourse)
          }
          {/*{*/}
          {/*  (course?.status === 'passive' || course?.status === 'fail') && course?.remarkForCourse !== '' &&*/}
          {/*  <div className={styles.remarkBlock}>*/}
          {/*    <RemarkTeach value={course?.remarkForCourse} rowsCount={7}/>*/}
          {/*  </div>*/}
          {/*}*/}
        </div>

        <div style={{width: '750px'}}>
          <TextField
            id={'name-course'}
            value={title}
            label="Название курса"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            style={{marginBottom: '20px', marginTop: '20px', fontSize: '22px'}}
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
            style={{marginBottom: '20px', fontSize: '22px'}}
            required
          />
          <div className={styles.block}>
            <p style={{marginTop: '0', fontSize: '22px'}}>Языковая группа</p>
            <div className={styles.selectors}>
              <SelectItem
                value={language}
                id={'languages'}
                options={languages}
                onChange={handleChange}
                style={{width: '360px', fontSize: '22px'}}
              />
              <SelectItem
                value={levelLanguage}
                id={'levelLanguages'}
                options={levelLanguages}
                onChange={handleChange}
                style={{width: '360px', fontSize: '22px'}}
              />
            </div>
          </div>

          <AddLessons
            title={title}
            desc={desc}
            language={language}
            levelLanguage={levelLanguage}
            imageUrl={imageUrl}
            status={course?.status}
          />

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

export function setRemarks(remarks) {
  const res = [];

  remarks?.forEach(remark => {
    if (remark !== '') {
      res.push(
        <div className={styles.remarkBlock}>
          <RemarkTeach value={remark} rowsCount={7}/>
        </div>
      )
    }
  })

  return res;
}

export default CreateCourse;
