import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {setDataPassesSample, setSentence} from "../../../../redux/slices/sampleLesson";
import styles from './PassesSample.module.scss';
import stylesSample from '../Sample.module.css';
import RemarkTeach from "../RemarkTeach";
import {findRemark} from "../Sample";
import {setRemarks} from "../../CreateCourse/CreateCourse";

const PassesSample = ({sentence}) => {
  const dispatch = useDispatch();

  const {sampleId, id} = useParams();
  const [course, setCourse] = useState(null);
  let isStatus;

  useEffect(() => {
    if (!sampleId) {
      dispatch(setDataPassesSample({
        title: '',
        sentence: '',
      }));

      return;
    }

    axios
      .get(`lessons/${sampleId}`)
      .then(({data}) => {
        setCourse(data)

        dispatch(setDataPassesSample({
          title: data.title,
          sentence: data.sentence,
        }))

        isStatus = course?.status !== 'check' || course?.status !== 'moderate';
      });
  }, []);

  const handleChange = (event) => dispatch(setSentence(event.target.value));

  return (
    <div className={stylesSample.content}>
      <div style={{width: isStatus ? `700px` : `100%`}}>
        <p>Правила оформления шаблона</p>
        <ol>
          <li className={styles.listItem}>Место пропуска отмечается квадратными скобками - []</li>
          <li className={styles.listItem}>В [] скобках <i>первым</i> пунктом указывается верный ответ</li>
          <li className={styles.listItem}>Варианты ответа нужно писать через запятую</li>
        </ol>
        <p>
          Пример: Мистер и миссис Дурсль проживали в доме номер четыре по
          [<span style={{color: 'green'}}>Тисовой</span>, Тихой, Мирной] улице...
        </p>
        <TextField
          id={'sentence'}
          value={sentence}
          label="Введите текст на иностранном языке"
          multiline
          rows={4}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          style={{marginBottom: '20px'}}
        />
      </div>

      {
        isStatus &&
        <div style={{width: '350px'}}>{setRemarks(course?.remarks)}</div>
      }

      {/*{*/}
      {/*  course?.remarks !== '' && (course?.status !== 'check' || course?.status !== 'moderate') &&*/}
      {/*  <div style={{width: '350px'}}><RemarkTeach value={course?.remarks} rowsCount={15}/></div>*/}
      {/*}*/}
    </div>
  );
}

export default PassesSample;
