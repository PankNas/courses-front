import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from './VideoSample.module.scss';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";

const VideoSample = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isUrl, setIsUrl] = useState(false);
  const [isReadyVideo, setIsReady] = useState(false);

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsReady(false);
  }, [isUrl]);

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'name-lesson':
        setTitle(event.target.value);
        break;
      case 'url-video':
        setVideoUrl(event.target.value);
        break;
      default:
        break;
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "200px",
      // autofocus: true,
      placeholder: "Введите короткое описание урока...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const handleAddBtn = () => setIsUrl(true);
  const handleDelBtn = () => {
    setIsUrl(false);
    setVideoUrl('');
  };
  const handleReady = () => setIsReady(true);
  const handleChangeEdit = React.useCallback((value) => setDesc(value), []);
  const handleSaveBtn = async () => {
    try {
      const fields = {
        title,
        desc,
        videoUrl,
        courseId: id,
      };

      await axios.post(`/lessons/video`, fields);

      navigate(`/teach/${id}/edit`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании видеоурока');
    }
  };

  return (
    <div>
      <h1>Видеоурок</h1>
      <TextField
        id={'name-lesson'}
        value={title}
        label="Название урока"
        onChange={handleChange}
        variant="outlined"
        fullWidth
        style={{marginBottom: '20px'}}
      />
      <TextField
        id={'url-video'}
        value={videoUrl}
        label="Вставьте сюда ссылку на видео с YouTube"
        onChange={handleChange}
        variant="outlined"
        fullWidth
        style={{marginBottom: '20px'}}
      />
      <Button
        variant="outlined"
        style={{marginRight: '15px'}}
        onClick={handleAddBtn}
      >
        {isUrl ? 'Заменить видео' : 'Добавить видео'}
      </Button>
      {isUrl &&
        <>
          <Button
            variant="outlined"
            onClick={handleDelBtn}
            style={{borderColor: 'red', color: 'red'}}
          >
            Удалить
          </Button>
          <div className={styles.videoWrapper}>
            <ReactPlayer
              url={`${videoUrl}`}
              onReady={handleReady}
              controls={true}
              width="100%"
              height="400px"
              style={{marginBottom: '20px', marginTop: '20px'}}
            />
            {!isReadyVideo && <div className={styles.spinner}></div>}
          </div>
        </>
      }
      <SimpleMDE
        id={'desc-lesson'}
        className={styles.editor}
        value={desc}
        onChange={handleChangeEdit}
        options={options}
        style={{paddingRight: '30px', paddingLeft: '30px'}}
      />
      <Button variant="outlined" onClick={handleSaveBtn}>
        Сохранить
      </Button>
    </div>
  );
};

export default VideoSample;
