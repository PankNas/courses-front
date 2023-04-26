import React, {useRef, useState} from 'react';

import styles from './CreateCourse.module.css';
import {languages, levelLanguages} from "./helper";

import Button from "@mui/material/Button";
import {Menu, MenuItem} from "@mui/material";
import SelectItem from "../../SelectItem.tsx";
import {Link, Navigate, useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "../../../axios";
import {useForm} from "react-hook-form";

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [language, setLanguage] = useState('');
  const [levelLanguage, setLevelLanguage] = useState(languages[0].value);
  const [imageUrl, setImageUrl] = useState(levelLanguages[0].value);
  // const [anchorEl, setAnchorEl] = useState(null);

  const inputFileRef = useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];

      formData.append("file", file);

      const {data} = await axios.post("/upload", formData);

      setImageUrl(data.url.slice(4));
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла!");
    }
  };

  // const handleClick = (event) => setAnchorEl(event.currentTarget);
  // const handleClose = () => setAnchorEl(null);

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'name-course':
        setTitle(event.target.value);
        break;
      case 'desc-course':
        setDesc(event.target.value);
        break;
      case 'languages':
        setLanguage(event.target.value);
        break;
      case 'levelLanguages':
        setLevelLanguage(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleDelBtn = () => setImageUrl('');

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        imageUrl,
        desc,
        language,
        levelLanguage,
      };

      console.log('hello');

      const {data} = axios.post("/courses", fields);

      console.log(data);

      // navigate(`/courses/${isEditing ? id : data._id}`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании курса');
    }
  };

  return (
    <div>
      <h1>Создание нового курса</h1>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
        style={{marginRight: '15px'}}
      >
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
      {imageUrl && (
        <>
          <Button
            variant="outlined"
            onClick={handleDelBtn}
            style={{borderColor: 'red', color: 'red'}}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:8000${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <TextField
        id={'name-course'}
        value={title}
        label="Название курса"
        onChange={handleChange}
        variant="outlined"
        fullWidth
        style={{marginBottom: '20px', marginTop: '20px'}}
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
      />
      <div className={styles.block}>
        <p style={{marginTop: '0'}}>Языковая группа</p>
        <SelectItem
          id={'languages'}
          options={languages}
          onChange={handleChange}
          style={{marginRight: '25px', width: '48%'}}
        />
        <SelectItem
          id={'levelLanguages'}
          options={levelLanguages}
          onChange={handleChange}
          style={{width: '48%'}}
        />
      </div>
      <Button variant="outlined" onClick={onSubmit}>Создать</Button>

      {/*<div className={styles.block}>*/}
      {/*  <p>Уроки<span style={{color: "red"}}> *</span></p>*/}
      {/*  <Button style={{padding: '0'}} className={styles.moduleAdd} onClick={handleClick}>*/}
      {/*    <div className={styles.moduleAddPlus}>+</div>*/}
      {/*    <p className={styles.moduleAddText}>Добавить урок</p>*/}
      {/*  </Button>*/}
      {/*  <Menu*/}
      {/*    id="simple-menu"*/}
      {/*    anchorEl={anchorEl}*/}
      {/*    keepMounted*/}
      {/*    open={Boolean(anchorEl)}*/}
      {/*    onClose={handleClose}*/}
      {/*    PaperProps={{sx: {width: '650px'}}}*/}
      {/*  >*/}
      {/*    <Link to='/teach/new/video-lesson'>*/}
      {/*      <MenuItem onClick={handleClose}>Видео</MenuItem>*/}
      {/*    </Link>*/}
      {/*    <MenuItem onClick={handleClose}>Тест</MenuItem>*/}
      {/*  </Menu>*/}
      {/*</div>*/}
    </div>
  );
};

export default CreateCourse;
