import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "../VideoSample/VideoSample.module.scss";
import SimpleMDE from "react-simplemde-editor";

const TextSample = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const {id, sampleId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sampleId) return;

    axios
      .get(`lessons/${sampleId}`)
      .then(({data}) => {
        setTitle(data.title);
        setDesc(data.desc);
      });

  }, []);

  const handleChange = (event) => setTitle(event.target.value);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      placeholder: "Введите описание урока...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const handleChangeEdit = React.useCallback((value) => setDesc(value), []);
  const handleSaveBtn = async () => {
    try {
      const fields = {
        type: 'text',
        title,
        desc,
        course: id,
      };

      sampleId ?
        await axios.patch(`/lessons/text/${sampleId}`, fields)
        : await axios.post(`/lessons/text`, fields);

      navigate(-1);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании теоретического урока');
    }
  };

  const handleNavigate = () => navigate(-1);

  return (
    <div>
      <h1>Теоретический урок</h1>
      <TextField
        id={'name-lesson'}
        value={title}
        label="Название урока"
        onChange={handleChange}
        variant="outlined"
        fullWidth
        style={{marginBottom: '10px'}}
      />
      <SimpleMDE
        id={'desc-lesson'}
        className={styles.editor}
        value={desc}
        onChange={handleChangeEdit}
        options={options}
        style={{paddingRight: '30px', paddingLeft: '30px'}}
      />
      <Button variant="outlined" onClick={handleSaveBtn} style={{marginRight: '15px'}}>
        Сохранить
      </Button>
      <Button variant="outlined" onClick={handleNavigate}>
        Отмена
      </Button>
    </div>
  );
};

export default TextSample;
