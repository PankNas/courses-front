import React, {useEffect, useState} from 'react';
import SelectItem from "../../SelectItem";
import styles from './style.module.scss';

const PassesLesson = ({sentence}) => {
  const [text, setText] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const parts = sentence.split(/\[(.*?)\]/g);

    const res = parts.map((elem, index) => {
      if (index % 2 === 0) return elem;

      let options = elem.split(',').sort(() => Math.random() - 0.5);

      return <SelectItem options={options} onChange={() => {}} height={{height: "30px"}}/>
    })

    setText(res);
  }, []);

  return (
    <>
      <p style={{lineHeight: "25px"}}>{text}</p>
    </>
  )
};

export default PassesLesson;
