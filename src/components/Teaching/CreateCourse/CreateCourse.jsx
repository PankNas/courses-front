import React, {useEffect, useRef, useState} from 'react';

import styles from './CreateCourse.module.css';
import {languages, levelLanguages} from "./helper";

import Button from "@mui/material/Button";
import SelectItem from "../../SelectItem.tsx";
import {useNavigate, useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "../../../axios";
import AddLessons from "../AddLessons/AddLessons";
import {useDispatch, useSelector} from "react-redux";
import {fetchCourses} from "../../../redux/slices/courses";

const CreateCourse = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [language, setLanguage] = useState(languages[0].value);
  const [levelLanguage, setLevelLanguage] = useState(levelLanguages[0].value);
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const inputFileRef = useRef(null);

  useEffect(() => {
    const getCourse = async () => (await axios.get(`/courses/${id}`)).data;

    getCourse()
      .then(res => {
        setTitle(res.title);
        setDesc(res.desc);
        setLevelLanguage(res.levelLanguage);
        setLanguage(res.language);
        setImageUrl(res.imageUrl);
      })

    // return () => {
    //   setImageUrl('');
    // }
  }, []);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();

      formData.append("file", event.target.files[0]);

      const {data} = await axios.post("/upload", formData);

      setImageUrl(data.url.slice(4));
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла!");
    }
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'name-course':
        return setTitle(event.target.value);
      case 'desc-course':
        return setDesc(event.target.value);
      case 'languages':
        return setLanguage(event.target.value);
      case 'levelLanguages':
        return setLevelLanguage(event.target.value);
      default: break;
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

      await axios.patch(`/courses/${id}`, fields);

      navigate('/teach');
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании курса');
    }
  };

  const onCancel = () => navigate(-1);

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
          value={language}
          id={'languages'}
          options={languages}
          onChange={handleChange}
          style={{marginRight: '25px', width: '48%'}}
        />
        <SelectItem
          value={levelLanguage}
          id={'levelLanguages'}
          options={levelLanguages}
          onChange={handleChange}
          style={{width: '48%'}}
        />
      </div>

      <AddLessons />

      <Button variant="outlined" onClick={onSubmit} style={{marginRight: '15px'}}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={onCancel}>Отмена</Button>
    </div>
  );
};

export default CreateCourse;
