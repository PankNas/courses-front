import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import styles from "./AddLessons.module.css";

import {Menu, MenuItem, Button} from "@mui/material";

const AddLessons = () => {
  const {id} = useParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div style={{marginBottom: '20px'}}>
      <p>Уроки<span style={{color: "red"}}> *</span></p>
      <Button style={{padding: '0'}} className={styles.moduleAdd} onClick={handleClick}>
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
        <Link to={`video-sample`}>
          <MenuItem onClick={handleClose}>Видео</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Тест</MenuItem>
      </Menu>
    </div>
  )
};

export default AddLessons;
