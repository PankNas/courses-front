import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const PassesSample = () => {
  const [title, setTitle] = useState('');
  const [sentence, setSentence] = useState('');

  const {id, sampleId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sampleId) return;

    axios
      .get(`lessons/${sampleId}`)
      .then(({data}) => {
        setTitle(data.title);
        setSentence(data.sentence);
      });

  }, []);

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'name-lesson':
        return setTitle(event.target.value);
      case 'sentence':
        return setSentence(event.target.value);
      default: break;
    }
  };

  const handleSaveBtn = async () => {
    try {
      const fields = {
        type: 'passes',
        title,
        sentence,
        course: id,
      };

      sampleId ?
        await axios.patch(`/lessons/passes/${sampleId}`, fields)
        : await axios.post(`/lessons/passes`, fields);

      navigate(-1);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании урока');
    }
  };

  const handleNavigate = () => navigate(-1);

  return (
    <div>
      <h1>Заполнить пропуски</h1>
      <TextField
        id={'name-lesson'}
        value={title}
        label="Название урока"
        onChange={handleChange}
        variant="outlined"
        fullWidth
        style={{marginBottom: '10px'}}
      />
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
      <Button variant="outlined" onClick={handleSaveBtn} style={{marginRight: '15px'}}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={handleNavigate}>
        Отмена
      </Button>
    </div>
  );
}

export default PassesSample;
