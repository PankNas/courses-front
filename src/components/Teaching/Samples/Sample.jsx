import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {setTitle} from "../../../redux/slices/sampleLesson";
import VideoSample from "./VideoSample/VideoSample";
import TextSample from "./TextSample/TextSample";
import SentenceSample from "./SentenceSample/SentenceSample";
import PassesSample from "./PassesSample/PassesSample";
import TestSample from "./TestSample/TestSample";

const Sample = () => {
  const dispatch = useDispatch();
  const sampleLesson = useSelector(state => state.sample);

  const {id, sampleId} = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`/teach/${id}/edit`);
  const handleInput = (event) => dispatch(setTitle(event.target.value));
  const handleSaveBtn = async () => {
    try {
      const fields = {
        ...sampleLesson,
        course: id,
      };

      sampleId ?
        await axios.patch(`/lessons/${sampleLesson.type}/${sampleId}`, fields)
        : await axios.post(`/lessons/${sampleLesson.type}`, fields);

      navigate(`/teach/${id}/edit`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании урока');
    }
  };

  return (
    <div>
      <h1>{sampleLesson.welcomeText}</h1>
      <TextField
        id={'name-lesson'}
        value={sampleLesson.title}
        label="Название урока"
        onChange={handleInput}
        variant="outlined"
        fullWidth
        style={{marginBottom: '20px'}}
      />

      {setSampleComponent(sampleLesson)}

      <Button variant="outlined" onClick={handleSaveBtn} style={{marginRight: '15px'}}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={handleNavigate}>
        Отмена
      </Button>
    </div>
  );
};

function setSampleComponent(sample) {
  switch (sample.type) {
    case 'video':
      return <VideoSample desc={sample.desc} videoUrl={sample.videoUrl} />;
    case 'text':
      return <TextSample desc={sample.desc} />;
    case 'sentence':
      return <SentenceSample sentence={sample.sentence} translate={sample.translate}/>;
    case 'passes':
      return <PassesSample sentence={sample.sentence} />;
    case 'test':
      return <TestSample itemsTest={sample.itemsTest}/>;
    default:
      return;
  }
}

export default Sample;
