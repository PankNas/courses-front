import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from './VideoLesson.module.scss';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";

const VideoLesson = () => {
  const [nameLesson, setName] = useState('');
  const [descLesson, setDesc] = useState('');
  const [urlVideo, setUrlVideo] = useState('');
  const [isUrl, setIsUrl] = useState(false);
  const [isReadyVideo, setIsReady] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsReady(false);
  }, [isUrl]);

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'name-lesson':
        setName(event.target.value);
        break;
      case 'url-video':
        setUrlVideo(event.target.value);
        break;
      default:
        break;
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
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
    setUrlVideo('');
  };
  const handleReady = () => setIsReady(true);
  const handleChangeEdit = React.useCallback((value) => setDesc(value), []);
  const handleSaveBtn = () => {
    navigate('/teach/new');
  };

  return (
    <div>
      <h1>Видеоурок</h1>
      <TextField
        id={'name-lesson'}
        value={nameLesson}
        label="Название урока"
        onChange={handleChange}
        variant="outlined"
        fullWidth
        style={{marginBottom: '20px'}}
      />
      <TextField
        id={'url-video'}
        value={urlVideo}
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
              url={`${urlVideo}`}
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
        value={descLesson}
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

export default VideoLesson;
