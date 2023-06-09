import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {setAnswer, setDataTranslateSample, setOptions, setQuestion} from "../../../../redux/slices/sampleLesson";
import axios from "../../../../axios";
import TextField from "@mui/material/TextField";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import styles from "../TestSample/ItemTest/ItemTest.module.scss";
import stylesSample from '../Sample.module.css';
import RemarkTeach from "../RemarkTeach";
import {findRemark} from "../Sample";
import {setRemarks} from "../../CreateCourse/CreateCourse";

const TranslateSample = ({question, answer, options}) => {
  const dispatch = useDispatch();

  const {sampleId, id} = useParams();
  const [course, setCourse] = useState(null);

  let isStatus;

  useEffect(() => {
    if (!sampleId) {
      dispatch(setDataTranslateSample({
        title: '',
        question: '',
        answer: -1,
        options: new Array(4).fill(''),
      }));

      return;
    }

    axios
      .get(`lessons/${sampleId}`)
      .then(({data}) => {
        setCourse(data)

        dispatch(setDataTranslateSample({
          title: data.title,
          question: data.question,
          answer: data.answer,
          options: data.options,
        }))

        isStatus = course?.status !== 'check' || course?.status !== 'moderate';
      });
  }, []);

  const handleChangeQuestion = (event) => dispatch(setQuestion(event.target.value));
  const handleChangeCheckBox = (event, index) => {
    dispatch(setAnswer(index))
  };
  const handleChangeOption = (event) => {
    const newOptions = options.slice();
    newOptions[event.target.id] = event.target.value;

    dispatch(setOptions(newOptions));
  };

  const isChecked = (index) => index === answer;

  return (
    <div className={stylesSample.content}>
      <div style={{width: `700px`}}>
        <TextField
          value={question}
          label="Введите текст для перевода"
          multiline
          rows={8}
          onChange={handleChangeQuestion}
          variant="outlined"
          fullWidth
          style={{marginBottom: '20px'}}
        />

        <FormGroup>
          {
            options.map((option, index) =>
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    id={index}
                    checked={isChecked(index)}
                    onChange={(event) => handleChangeCheckBox(event, index)}/>
                }
                label={
                  <input
                    id={index}
                    className={styles.optionItem}
                    type="text"
                    placeholder={`Ответ ${index + 1}`}
                    value={option}
                    onChange={handleChangeOption}
                  />
                }/>
            )
          }
        </FormGroup>
      </div>

      {
        (course?.status !== 'check' || course?.status !== 'moderate') &&
        <div style={{width: '350px'}}>{setRemarks(course?.remarks)}</div>
      }
    </div>
  )
};

export default TranslateSample;
