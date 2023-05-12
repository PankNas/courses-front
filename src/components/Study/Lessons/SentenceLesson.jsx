import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import Button from "@mui/material/Button";

const SentenceLesson = ({sentence, translate}) => {
  const [text, setText] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const arr = sentence.split(' ').sort(() => Math.random() - 0.5);
    setWords(arr.map(value => ({value: value, active: true})));
  }, []);

  const handleClickWord = (event) => {
    console.log('hi');
    setText([...text, {value: event.target.value, active: false}]);
    // event.target.classList.add(styles.gray);
    console.log(event.target);
  };
  const handleClickText = (event) => {
    let arr = text.slice();
    arr.splice(+event.target.id, 1);

    setText(arr);

    arr = words.slice();
    const elem = arr.find(elem => elem === event.target.value);
    const index = arr.indexOf(elem);

    arr.splice(index, 1, {value: elem.value, active: true});
  }

  return (
    <>
      <p>Составьте текст их слов</p>
      <p>{translate}</p>
      <ul className={styles.wordsBox}>
        {
          text.map((word, index) =>
            <li
              key={index}
              id={`${index}`}
              className={styles.wordItem}
              // onClick={handleClickText}
            >
              <button
                id={`${index}`}
                onClick={handleClickText}
                className={cn(styles.text, styles.textRes)}
              >
                {word}
              </button>
            </li>
          )
        }
      </ul>
      <ul className={styles.wordsBox}>
        {
          words.map((word, index) =>
            <li
              key={index}
              id={`${index}`}
              className={styles.wordItem}
              // onClick={handleClickWord}
            >
              <Button
                id={`${index}`}
                variant={'contained'}
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
    </>
  );
};

export default SentenceLesson;
