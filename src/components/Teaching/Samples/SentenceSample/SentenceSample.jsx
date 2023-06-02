import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../../../axios";
import TextField from "@mui/material/TextField";
import {useDispatch} from "react-redux";
import {setDataSentenceSample, setSentence, setTranslate} from "../../../../redux/slices/sampleLesson";
import stylesSample from '../Sample.module.css';
import RemarkTeach from "../RemarkTeach";
import {findRemark} from "../Sample";
import {setRemarks} from "../../CreateCourse/CreateCourse";

const SentenceSample = ({sentence, translate}) => {
  const dispatch = useDispatch();

  const {sampleId, id} = useParams();
  const [course, setCourse] = useState(null);

  let isStatus;

  useEffect(() => {
    if (!sampleId) {
      dispatch(setDataSentenceSample({
        title: '',
        sentence: '',
        translate: '',
      }));

      return;
    }

    axios
      .get(`lessons/${sampleId}`)
      .then(({data}) => {
        setCourse(data);

        dispatch(setDataSentenceSample({
          title: data.title,
          sentence: data.sentence,
          translate: data.translate,
        }));

        isStatus = course?.status !== 'check' || course?.status !== 'moderate';
      });
  }, []);

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'sentence':
        return dispatch(setSentence(event.target.value));
      case 'translate':
        return dispatch(setTranslate(event.target.value));
      default:
        break;
    }
  };

  return (
    <div className={stylesSample.content}>
      <div style={{width: `700px`}}>
        <TextField
          id={'sentence'}
          value={sentence}
          label="Введите текст на иностранном языке"
          multiline
          rows={4}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <p>Примечание: число блоков для составления текста будет равняться числу слов.</p>
        <TextField
          id={'translate'}
          value={translate}
          label="Введите перевод"
          multiline
          rows={4}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          style={{marginBottom: '20px'}}
        />
      </div>

      {
        (course?.status !== 'check' || course?.status !== 'moderate') &&
        <div style={{width: '350px'}}>{setRemarks(course?.remarks)}</div>
      }
    </div>
  );
};

export default SentenceSample;
