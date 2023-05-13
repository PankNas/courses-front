import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {setFinishLesson} from "./finishLesson";
import Button from "@mui/material/Button";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

const TranslateLesson = ({question, options, answer}) => {
  const {courseId, lessonId} = useParams();
  const [curAnswer, setCurAnswer] = useState(-1);

  const isChecked = (index) => index === curAnswer;

  const handleChangeCheckBox = (event, index) => {
    setCurAnswer(+index);
  };
  const handleClickCheck = () => {
    if (curAnswer !== answer) {
      alert('Увы, ответ неверный. Попробуйте снова');
      return;
    }

    alert('Успех!');
    setFinishLesson(courseId, lessonId).then();
  }

  return (
    <>
      <p>Переведите текст</p>
      <p style={{textAlign: "center"}}>{question}</p>
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
              label={option}/>
          )
        }
      </FormGroup>
      <Button
        style={{marginTop: "20px"}}
        variant={'outlined'}
        onClick={handleClickCheck}
      >
        Проверить
      </Button>
    </>
  );
};

export default TranslateLesson;
