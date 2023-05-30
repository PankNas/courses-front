import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Button from "@mui/material/Button";
import {setFinishLesson} from "./finishLesson";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const SentenceLesson = ({sentence, translate, isModerate}) => {
  const {courseId, lessonId} = useParams();

  const [text, setText] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const arr = sentence.split(' ').sort(() => Math.random() - 0.5);
    setWords(arr.map(value => ({value: value, active: false})));
  }, []);

  const handleClickWord = async (event) => {
    await setText([...text, event.target.name]);

    const arr = words.slice();
    const elem = arr.find(elem => elem.value === event.target.name);
    const index = arr.indexOf(elem);

    arr.splice(index, 1, {value: elem.value, active: true});
    setWords(arr);
  };
  const handleClickText = (event) => {
    let arr = text.slice();
    arr.splice(+event.target.id, 1);

    setText(arr);

    arr = words.slice();
    const elem = arr.find(elem => elem.value === event.target.name);
    const index = arr.indexOf(elem);

    arr.splice(index, 1, {value: elem.value, active: false});
    setWords(arr);
  };
  const handleClickCheck = () => {
    if (text.join(' ') !== sentence) {
      alert('Увы, ответ неверный. Попробуйте снова');
      return;
    }

    alert('Успех!');

    if (isModerate) return;

    setFinishLesson(courseId, lessonId).then();
  }

  return (
    <>
      <p>Составьте текст из слов</p>
      <pre><ReactMarkdown children={translate}/></pre>
      {/*<p>{translate}</p>*/}
      <ul className={cn(styles.wordsBox, styles.textBox)}>
        {
          text.map((word, index) =>
            <li
              key={index}
              id={`${index}`}
              className={styles.wordItem}
            >
              <button
                id={`${index}`}
                onClick={handleClickText}
                name={word}
                className={cn(styles.text, styles.textRes)}
              >
                {word}
              </button>
            </li>
          )
        }
      </ul>
      <ul className={styles.wordsBox} style={{marginBottom: "20px"}}>
        {
          words.map((word, index) =>
            <li
              key={index}
              id={`${index}`}
              className={styles.wordItem}
            >
              <Button
                id={`${index}`}
                variant={'contained'}
                name={word.value}
                className={styles.text}
                onClick={handleClickWord}
                disabled={word.active}
              >
                {word.value}
              </Button>
            </li>
          )
        }
      </ul>
      <Button variant={'outlined'} onClick={handleClickCheck}>Проверить</Button>
    </>
  );
};

export default SentenceLesson;
