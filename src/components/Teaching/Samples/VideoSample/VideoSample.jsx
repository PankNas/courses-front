import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from './VideoSample.module.scss';
import stylesSample from '../Sample.module.css';

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
import RemarkTeach from "../RemarkTeach";
import {setRemarks} from "../../CreateCourse/CreateCourse";

const VideoSample = ({desc, videoUrl}) => {
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const [video, setVideo] = useState('');

  const [isUrl, setIsUrl] = useState(false);
  const [isReadyVideo, setIsReady] = useState(false);
  // const [videoDuration, setVideoDuration] = React.useState(null);

  const {sampleId, id} = useParams();
  let isStatus;

  useEffect(() => {
    if (!sampleId) {
      dispatch(setDataVideoSample({
        title: '',
        desc: '',
        videoUrl: '',
      }));

      setVideo('');

      return;
    }

    axios
      .get(`lessons/${sampleId}`)
      .then(({data}) => {
        setCourse(data);

        dispatch(setDataVideoSample({
          title: data.title,
          desc: data.desc,
          videoUrl: data.videoUrl,
        }))

        setVideo(videoUrl);

        isStatus = course?.status !== 'check' || course?.status !== 'moderate';
      });
  }, []);

  const handleChange = (event) => {
    // dispatch(setVideoUrl(event.target.value));
    // console.log(event.target.value);
    setVideo(event.target.value)
    dispatch(setVideoUrl(''));
  }
  const handleReady = () => {
    setIsReady(true);
    // console.log('hi', video);
    dispatch(setVideoUrl(video));
    // setVideoDuration(props.player.getDuration());
  }
  const handleAddBtn = () => {
    setIsUrl(true);
    setIsReady(false);
  };
  const handleDelBtn = () => {
    setIsUrl(false);
    setVideo('')
    dispatch(setVideoUrl('', ''));
  };

  const updateDesc = (value) => dispatch(setDesc(value));

  return (
    <div className={stylesSample.content}>
      <div style={{width: `700px`}}>
        <TextField
          id={'url-video'}
          value={video}
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
                url={`${video}`}
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
      </div>

      {
        (course?.status !== 'check' || course?.status !== 'moderate') &&
        <div style={{width: '350px'}}>{setRemarks(course?.remarks)}</div>
      }
    </div>
  );
};

export default VideoSample;
