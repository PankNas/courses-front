import React from 'react';

import styles from './CreateCourse.module.css';

import Button from "@mui/material/Button";
import {Menu, MenuItem} from "@mui/material";
import InputItem from "../../InputItem.jsx";
import SelectItem from "../../SelectItem.jsx";
import {Navigate, Outlet} from "react-router-dom";

const languages = [
  {
    value: 'english',
    text: 'Английский',
  },
  {
    value: 'german',
    text: 'Немецкий',
  },
  {
    value: 'french',
    text: 'Французский',
  }
];

const levelLanguages = [
  {
    value: 'A1',
    text: 'Начальный',
  },
  {
    value: 'A2',
    text: 'Ниже среднего',
  },
  {
    value: 'B1',
    text: 'Средний',
  },
  {
    value: 'B2',
    text: 'Выше среднего',
  },
  {
    value: 'C1',
    text: 'Продвинутый',
  },
  {
    value: 'C2',
    text: 'Профессиональный',
  }
];

const CreateCourse = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    return <Navigate to='/teach/new/video-lesson' />
  };

  return (
    <div>
      <h1>Создание нового курса</h1>
      <div style={{marginBottom: '30px'}}>
        <p>Название<span style={{color: "red"}}> *</span></p>
        <InputItem id='name-course' title='Название' multiline={false} rows={1}/>
      </div>
      <div style={{marginBottom: '30px'}}>
        <p>Описание<span style={{color: "red"}}> *</span></p>
        <InputItem id='desc-course' title='Описание' multiline={true} rows={4}/>
      </div>
      <div className={styles.block}>
        <p>Языковая группа</p>
        <SelectItem id={'languages'} options={languages} style={{marginRight: '25px', width: '48%'}}/>
        <SelectItem id={'levelLanguages'} options={levelLanguages} style={{width: '48%'}}/>
      </div>
      <div className={styles.block}>
        <p>Уроки<span style={{color: "red"}}> *</span></p>
        <Button
          style={{padding: '0'}}
          className={styles.moduleAdd}
          onClick={handleClick}
        >
          <div className={styles.moduleAddPlus}>+</div>
          <p className={styles.moduleAddText}>Добавить урок</p>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{sx: {width: '650px'}}}
        >
          <MenuItem onClick={handleClose}>Видео</MenuItem>
          <MenuItem onClick={handleClose}>Тест</MenuItem>
        </Menu>
      </div>

      <Button variant="outlined">Сохранить</Button>
      <Outlet />
    </div>
  );
};

export default CreateCourse;
