import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {setFinishLesson} from "./finishLesson";
import Button from "@mui/material/Button";
import styles from './style.module.scss';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import CheckboxItem from "../../CheckboxItem";

const TestLesson = ({items, totalScore}) => {
  const {courseId, lessonId} = useParams();
  const [answers, setAnswers] = useState(new Array(items?.length).fill(0));

  const handleChangeCheckBox = (event, index, numItem) => {
    const copyAnswers = answers.slice();
    copyAnswers.splice(numItem, 1, index);

    setAnswers(copyAnswers)
    // setCurAnswer(+index);
  };
  const handleClickCheck = () => {
    // if (curAnswer !== answer) {
    //   alert('Увы, ответ неверный. Попробуйте снова');
    //   return;
    // }
    //
    // alert('Успех!');
    // setFinishLesson(courseId, lessonId).then();
  };

  return (
    <>
      <p>Набрано ? из {totalScore}</p>
      {
        items.map((item, index) =>
          <div key={item.id} className={styles.testItem}>
            <p>{item?.question}</p>
            <CheckboxItem
              options={item?.options}
              answer={answers[index]}
              fnChange={handleChangeCheckBox}
              numberItem={index}
            />
          </div>
        )
      }
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

export default TestLesson;
