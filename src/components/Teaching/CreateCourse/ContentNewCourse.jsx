import React, {useEffect, useRef, useState} from 'react';
import styles from "./CreateCourse.module.css";
import {IconButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../../App";
import TextField from "@mui/material/TextField";
import SelectItem from "../../SelectItem";
import {languages, levelLanguages} from "./helper";
import AddLessons from "../AddLessons/AddLessons";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axios";

const ContentNewCourse = () => {
  const {id} = useParams();
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
        setTitle(res.title);
        setDesc(res.desc);
        setLevelLanguage(res.levelLanguage);
        setLanguage(res.language);
        setImageUrl(res.imageUrl);
      });

    return () => {
      setImageUrl('');
      setLanguage('');
      setLevelLanguage('');
    };
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

      alert('Ошибка при создании курса');
    }
  };

  const onCancel = () => navigate(-1);

  return (
    <div className={styles.content}>
      <div className={styles.imgBlock}>
        <button
          onClick={() => inputFileRef.current.click()}
          style={{marginRight: '15px'}}
          className={styles.button}
        >
          Загрузить превью
        </button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
        {imageUrl && (
          <>
            <IconButton onClick={handleDelBtn}>
              <Avatar src={`${pathFolder}/my/delete.svg`}/>
            </IconButton>
            {
              imageUrl !== '' ?
                <img
                  className={styles.image}
                  src={`http://localhost:8000${imageUrl}`}
                  alt="Uploaded"
                /> :
                <Avatar src={`${pathFolder}/my/backAvaCourse.jpg`}/>
            }
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
              style={{width: '740px / 2'}}
            />
            <SelectItem
              value={levelLanguage}
              id={'levelLanguages'}
              options={levelLanguages}
              onChange={handleChange}
              style={{width: '740px / 2'}}
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
  )
}

export default ContentNewCourse;
