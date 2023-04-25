import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';

import styles from './VideoLesson.module.css';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const VideoLesson = () => {
  const [nameLesson, setName] = useState('');
  const [descLesson, setDesc] = useState('');
  const [urlVideo, setUrlVideo] = useState('');
  const [isUrl, setIsUrl] = useState(false);
  const [isReadyVideo, setIsReady] = useState(false);

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
      case 'desc-lesson':
        setDesc(event.target.value);
        break;
      default: break;
    }
  };

  const handleAddBtn = () => setIsUrl(true);
  const handleDelBtn = () => setIsUrl(false);
  const handleReady = () => setIsReady(true);

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
        id={'desc-lesson'}
        value={descLesson}
        label={'Краткое описание урока'}
        multiline
        rows={3}
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
      {/*<SimpleMDE*/}
      {/*  className={styles.editor}*/}
      {/*  value={description}*/}
      {/*  onChange={onChange}*/}
      {/*  options={options}*/}
      {/*/>*/}
    </div>
  );
};

export default VideoLesson;
