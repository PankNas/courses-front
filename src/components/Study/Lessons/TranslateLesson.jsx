import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {setFinishLesson} from "./finishLesson";
import Button from "@mui/material/Button";
import CheckboxItem from "../../CheckboxItem";

const TranslateLesson = ({question, options, answer, isModerate}) => {
  const {courseId, lessonId} = useParams();
  const [curAnswer, setCurAnswer] = useState(-1);

  const handleChangeCheckBox = (event, index, _numItem) => {
    setCurAnswer(+index);
  };
  const handleClickCheck = () => {
    if (curAnswer !== answer) {
      alert('Увы, ответ неверный. Попробуйте снова');
      return;
    }

    alert('Успех!');

    if (isModerate) return;

    setFinishLesson(courseId, lessonId).then();
  }

  return (
    <>
      <p>Переведите текст</p>
      <p style={{textAlign: "center"}}>{question}</p>
      <CheckboxItem
        options={options}
        answer={curAnswer}
        fnChange={handleChangeCheckBox}
      />
      {/*<FormGroup>*/}
      {/*  {*/}
      {/*    options.map((option, index) =>*/}
      {/*      <FormControlLabel*/}
      {/*        key={index}*/}
      {/*        control={*/}
      {/*          <Checkbox*/}
      {/*            id={index}*/}
      {/*            checked={isChecked(index)}*/}
      {/*            onChange={(event) => handleChangeCheckBox(event, index)}/>*/}
      {/*        }*/}
      {/*        label={option}/>*/}
      {/*    )*/}
      {/*  }*/}
      {/*</FormGroup>*/}
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
