import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from './VideoSample.module.scss';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useDispatch} from "react-redux";
import {
  setDataVideoSample,
  setDesc,
  setVideoUrl,
} from "../../../../redux/slices/sampleLesson";
import axios from "../../../../axios";
import {useParams} from "react-router-dom";
import Editor from "../Editor";

const VideoSample = ({desc, videoUrl}) => {
  const dispatch = useDispatch();

  const [isUrl, setIsUrl] = useState(false);
  const [isReadyVideo, setIsReady] = useState(false);

  const {sampleId} = useParams();

  useEffect(() => {
    if (!sampleId) {
      dispatch(setDataVideoSample({
        title: '',
        desc: '',
        videoUrl: '',
      }));

      return;
    }

    axios
      .get(`lessons/${sampleId}`)
      .then(({data}) => {
        dispatch(setDataVideoSample({
          title: data.title,
          desc: data.desc,
          videoUrl: data.videoUrl,
        }))
      });
  }, []);

  const handleChange = (event) => dispatch(setVideoUrl(event.target.value));
  const handleReady = () => setIsReady(true);
  const handleAddBtn = () => {
    setIsUrl(true);
    setIsReady(false);
  };
  const handleDelBtn = () => {
    setIsUrl(false);
    dispatch(setVideoUrl('', ''));
  };

  const updateDesc = (value) => dispatch(setDesc(value));

  return (
    <>
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
            {/*{!isReadyVideo && <div className={styles.spinner}></div>}*/}
          </div>
        </>
      }
      <Editor
        value={desc}
        height={'200px'}
        placeholder={"Введите короткое описание урока..."}
        fn={updateDesc}
      />
    </>
  );
};

export default VideoSample;
