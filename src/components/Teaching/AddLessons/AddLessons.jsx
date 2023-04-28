import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

import styles from "./AddLessons.module.css";

import {Menu, MenuItem, Button, List, ListItem, ListItemIcon, ListItemText, IconButton} from "@mui/material";
import axios from "../../../axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchLessons} from "../../../redux/slices/lessons";
import {light} from "@mui/material/styles/createPalette";

const AddLessons = () => {
  const {id} = useParams();

  const dispatch = useDispatch();
  const {items} = useSelector(state => state.lessons);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const onClickRemove = (event) => {
    console.log(event.target);
    // if (!window.confirm("Вы действительно хотите удалить урок?")) return;

    // dispatch(fetchRemoveLesson(items[event.target]));
  };

  useEffect(() => {
    dispatch(fetchLessons(id));
  }, []);

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
      <List className={styles.lessons}>
        {
          items.map((item, index) =>
            <ListItem key={index} className={styles.lessonsItem}>
                <ListItemIcon/>
                <ListItemText primary={item.title}/>
              <IconButton onClick={onClickRemove} color="secondary">
                X
              </IconButton>
            </ListItem>
          )
        }
      </List>
    </div>
  )
};

export default AddLessons;
