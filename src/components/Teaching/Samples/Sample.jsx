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
import TranslateSample from "./TranslateSample/TranslateSample";
import styles from './Sample.module.css';
import Remark from "../../Remark/Remark";
import RemarkTeach from "./RemarkTeach";

const Sample = () => {
  const dispatch = useDispatch();
  const sampleLesson = useSelector(state => state.sample);

  const {id, sampleId, moduleId, lessonId} = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => navigate(`/teach/${id}/edit`);
  const handleInput = (event) => dispatch(setTitle(event.target.value));
  const handleSaveBtn = async () => {
    try {
      const fields = {
        ...sampleLesson,
        course: id,
        module: moduleId,
      };

      if (sampleLesson.type === 'test') {
        fields.totalScore = sampleLesson.itemsTest.reduce((sum, elem) => sum + elem.score, 0);
      }

      sampleId ?
        await axios.patch(`/lessons/${sampleLesson.type}/${sampleId}`, fields)
        : await axios.post(`/lessons/${sampleLesson.type}`, fields);

      // console.log('lesson', lesson);

      navigate(`/teach/${id}/edit`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании урока');
    }
  };

  return (
    <div className={styles.container}>
      <h1>{sampleLesson.welcomeText}</h1>
      {/*<div className={styles.content}>*/}
        {/*<div style={{width: '700px'}}>*/}
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

          <div className={styles.buttons}>
            <button
              onClick={handleSaveBtn}
              style={{marginRight: '15px'}}
              className={styles.button}
            >
              Сохранить
            </button>
            <button
              onClick={handleNavigate}
              className={styles.button}
            >
              Отмена
            </button>
          {/*</div>*/}
        {/*</div>*/}

        {/*<div style={{width: '350px'}}><RemarkTeach value={findRemark()} rowsCount={15}/></div>*/}
      </div>
    </div>
  );
};

function setSampleComponent(sample) {
  switch (sample.type) {
    case 'video':
      return <VideoSample desc={sample.desc} videoUrl={sample.videoUrl} />;
    case 'text':
      return <TextSample desc={sample.desc} remarks={sample.remarks}/>;
    case 'sentence':
      return <SentenceSample sentence={sample.sentence} translate={sample.translate}/>;
    case 'passes':
      return <PassesSample sentence={sample.sentence} />;
    case 'test':
      return <TestSample itemsTest={sample.itemsTest}/>;
    case 'translate':
      return <TranslateSample question={sample.question} answer={sample.answer} options={sample.options}/>
    default:
      return;
  }
}

export default Sample;
