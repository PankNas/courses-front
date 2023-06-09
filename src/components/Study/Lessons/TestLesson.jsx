import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {setFinishLesson} from "./finishLesson";
import Button from "@mui/material/Button";
import styles from './style.module.scss';
import CheckboxItem from "../../CheckboxItem";
import ReactMarkdown from "react-markdown";

const TestLesson = ({items, totalScore, isModerate}) => {
  const {courseId, lessonId} = useParams();
  const [answers, setAnswers] = useState(new Array(items?.length).fill(-1));
  const [score, setScore] = useState('');

  const handleChangeCheckBox = (event, index, numItem) => {
    const copyAnswers = answers.slice();
    copyAnswers.splice(numItem, 1, index);

    setAnswers(copyAnswers);
  };
  const handleClickCheck = () => {
    const sumScore = items.reduce((acc, item, index) => {
      if (item.answer === answers[index]) return acc + item.score;

      return acc;
    }, 0);

    setScore(sumScore);

    if (isModerate) return;

    setFinishLesson(courseId, lessonId).then();
  };

  return (
    <>
      {
        items.map((item, index) =>
          <div key={item.id} className={styles.testItem}>
            <div style={{width: '100%'}}>
              <ReactMarkdown children={item?.question}/>
            </div>
            {/*<p>{item?.question}</p>*/}

            <CheckboxItem
              options={item?.options}
              answer={answers[index]}
              fnChange={handleChangeCheckBox}
              numItem={index}
            />
          </div>
        )
      }
      {
        score === '' ?
          <Button
            style={{marginTop: "20px"}}
            variant={'outlined'}
            onClick={handleClickCheck}
          >
            Проверить
          </Button>
          :
          <p>Набрано {score} из {totalScore}</p>
      }
    </>
  );
};

export default TestLesson;
