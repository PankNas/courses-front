import React, {useState} from 'react';

import styles from './CreateCourse.module.css';
import cn from 'classnames';

import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {FormControl, Select} from "@mui/material";

const CreateCourse = () => {
  const [nameCourse, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleInputName = (event) => setName(event.target.value);
  const handleInputDesc = (event) => setDesc(event.target.value);

  return (
    <div>
      <h1>Создание нового курса</h1>
      <div className={styles.block}>
        <p>Название<span style={{color: "red"}}> *</span></p>
        <TextField
          id="name-course"
          value={nameCourse}
          onChange={handleInputName}
          variant="outlined"
          fullWidth
        />
      </div>
      <div className={styles.block}>
        <p>Описание<span style={{color: "red"}}> *</span></p>
        <TextField
          id="description"
          value={desc}
          onChange={handleInputDesc}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />
      </div>
      <div className={styles.block}>
        <p>Языковая группа</p>
        <FormControl variant="outlined" style={{marginRight: '25px', width: '48%'}}>
          <Select
            native
            defaultValue="english"
            // onChange={handleChange}
            inputProps={{
              name: 'language',
              id: 'language',
            }}
          >
            <option aria-label="None" value=""/>
            <option value={'english'}>Английский</option>
            <option value={'german'}>Немецкий</option>
            <option value={'french'}>Французский</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{width: '48%'}}>
          <Select
            native
            value="A1"
            // onChange={handleChange}
            inputProps={{
              name: 'levelLanguage',
              id: 'levelLanguage',
            }}
          >
            <option aria-label="None" value=""/>
            <option value={'A1'}>Начальный</option>
            <option value={'A2'}>Ниже среднего</option>
            <option value={'A1'}>Средний</option>
            <option value={'B2'}>Выше среднего</option>
            <option value={'A1'}>Продвинутый</option>
            <option value={'C2'}>Профессиональный</option>
          </Select>
        </FormControl>
      </div>
      <div className={styles.block}>
        <p>Модули<span style={{color: "red"}}> *</span></p>
        <div className={styles.addModule}>
          <div className={styles.addModulePlus}>dfgdfg</div>
          <p>dgdg</p>
        </div>
      </div>

      <Button variant="outlined">Сохранить</Button>
    </div>
  );
};

export default CreateCourse;
