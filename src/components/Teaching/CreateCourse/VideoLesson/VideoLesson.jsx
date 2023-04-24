import React, {useState} from 'react';
import ReactPlayer from 'react-player';

import styles from './VideoLesson.module.css';

import Button from "@mui/material/Button";
import {Container} from "@mui/material";
import InputItem from "../../../InputItem";
import axios from "../../../../axios";

const VideoLesson = () => {
  const [urlVideo, setUrlVideo] = useState('');
  const inputFileRef = React.useRef(null);

  const handleUrlValue = (newUrl) => setUrlVideo(newUrl);
  const handleUrlButton = () => inputFileRef.current.click();
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];

      console.log('formData', file);

      formData.append("file", file);

      console.log('formData', formData);

      const { data } = await axios.post("/upload", formData);

      console.log('data', data);

      setUrlVideo(data.url.slice(4));
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла!");
    }
  };

  return (
    <div>
      <h1>Видеоурок</h1>
      {/*<ReactPlayer*/}
      {/*  url={`${urlVideo}`}*/}
      {/*  playing*/}
      {/*  controls={true}*/}
      {/*  width='100%'*/}
      {/*  height='400px'*/}
      {/*  style={{marginBottom: '20px'}}*/}
      {/*/>*/}
      <Button
        variant="outlined"
        style={{marginBottom: '15px'}}
        onClick={() => inputFileRef.current.click()}
      >
        Загрузить видео из файла
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      <InputItem
        id={'url-video'}
        multiline={false}
        label='или вставьте сюда ссылку на видео с YouTube'
        onInputChange={handleUrlValue}
      />
    </div>
  )
}

export default VideoLesson;
