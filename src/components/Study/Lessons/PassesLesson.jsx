import React, {useEffect, useState} from 'react';
import SelectItem from "../../SelectItem";
import styles from './style.module.scss';
import Button from "@mui/material/Button";
import {setFinishLesson} from "./finishLesson";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const PassesLesson = ({sentence, size, options, answers, isModerate}) => {
  const {courseId, lessonId} = useParams();

  const [text, setText] = useState([]);
  const [values, setValues] = useState(new Array(size).fill(''));

  useEffect(() => {
    const handleChange = (event) => {
      values[+event.target.id] = event.target.value;
      setValues(values)
    }

    const parts = sentence.split(/\[(.*?)\]/g);
    let indexSelect = -1;

    const res = parts.map((elem, index) => {
      if (index % 2 === 0) return elem;

      indexSelect += 1;

      return <SelectItem
        id={`${indexSelect}`}
        options={options[indexSelect]}
        value={values[indexSelect]}
        onChange={handleChange}
        height={{height: "30px"}}
      />
    })

    setText(res);
  }, [text]);

  const handleClick = async () => {

    const isCorrect = values.findIndex((value, index) => value !== answers[index]);

    if (isCorrect !== -1) {
      alert('Увы, ответ неверный. Попробуйте снова');
      return;
    }

    alert('Успех!')

    if (isModerate) return;

    await setFinishLesson(courseId, lessonId);
  }

  return (
    <>
      <pre style={{lineHeight: "25px"}}><ReactMarkdown children={text}/></pre>
      {/*<p style={{lineHeight: "25px"}}>{text}</p>*/}
      <Button variant={'outlined'} onClick={handleClick}>Проверить</Button>
    </>
  )
};

export default PassesLesson;
