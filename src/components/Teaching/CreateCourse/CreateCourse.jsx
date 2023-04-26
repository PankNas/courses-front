import React, {useEffect, useRef, useState} from 'react';

import styles from './CreateCourse.module.css';
import {languages, levelLanguages} from "./helper";

import Button from "@mui/material/Button";
import SelectItem from "../../SelectItem.tsx";
import {useNavigate, useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "../../../axios";
import AddLessons from "../AddLessons/AddLessons";

const CreateCourse = () => {
  const {id} = useParams();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [language, setLanguage] = useState(languages[0].value);
  const [levelLanguage, setLevelLanguage] = useState(levelLanguages[0].value);
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const inputFileRef = useRef(null);

  useEffect(() => {
    return (
      setImageUrl('')
    )
  }, []);

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

      await axios.patch(`/courses/${id}`, fields);

      // navigate(`/teach`);
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

      <AddLessons />

      <Button variant="outlined" onClick={onSubmit}>Сохранить</Button>
    </div>
  );
};

export default CreateCourse;
