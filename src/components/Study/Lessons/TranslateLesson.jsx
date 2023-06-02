import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {setFinishLesson} from "./finishLesson";
import Button from "@mui/material/Button";
import CheckboxItem from "../../CheckboxItem";
import ReactMarkdown from "react-markdown";

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
      <div style={{width: '100%'}}>
        <ReactMarkdown children={question}/>
      </div>
      {/*<pre style={{textAlign: "center"}}><ReactMarkdown children={question}/></pre>*/}
      {/*<p style={{textAlign: "center"}}>{question}</p>*/}
      <CheckboxItem
        options={options}
        answer={curAnswer}
        fnChange={handleChangeCheckBox}
      />
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
