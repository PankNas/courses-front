import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {setDataPassesSample, setSentence} from "../../../../redux/slices/sampleLesson";

const PassesSample = ({sentence}) => {
  const dispatch = useDispatch();

  const {sampleId} = useParams();

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
        dispatch(setDataPassesSample({
          title: data.title,
          sentence: data.sentence,
        }))
      });
  }, []);

  const handleChange = (event) => dispatch(setSentence(event.target.value));

  return (
    <>
      <p>Правила оформления шаблона</p>
      <ol>
        <li>Место пропуска отмечается квадратными скобками - []</li>
        <li>В [] скобках <i>первым</i> пунктом указывается верный ответ</li>
        <li>Варианты ответа нужно писать через запятую</li>
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
    </>
  );
}

export default PassesSample;
