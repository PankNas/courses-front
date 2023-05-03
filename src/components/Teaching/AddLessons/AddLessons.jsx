import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import styles from "./AddLessons.module.css";

import {Menu, MenuItem, Button, List, ListItem, ListItemIcon, ListItemText, IconButton} from "@mui/material";
import axios from "../../../axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchLessons, fetchRemoveLesson} from "../../../redux/slices/lessons";

const AddLessons = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {items} = useSelector(state => state.lessons);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const onClickRemove = (event) => {
    if (!window.confirm("Вы действительно хотите удалить урок?")) return;

    dispatch(fetchRemoveLesson(items[event.target.id]._id));
  };
  const onClickEdit = (event) => {
    const item = items[event.target.id];

    switch (item.type) {
      case 'video':
        return navigate(`video-sample/${item._id}`);
      case 'text':
        return navigate(`text-sample/${item._id}`)
      default: return;
    }
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
        <Link to={`text-sample`}>
          <MenuItem onClick={handleClose}>Теория</MenuItem>
        </Link>
        <Link to={`video-sample`}>
          <MenuItem onClick={handleClose}>Видео</MenuItem>
        </Link>
      </Menu>
      <List className={styles.lessons}>
        {
          items.map((item, index) =>
            <ListItem key={index} className={styles.lessonsItem}>
              <ListItemIcon/>
              <ListItemText primary={item.title}/>
              <IconButton id={index} onClick={onClickEdit} color="secondary">
                E
              </IconButton>
              <IconButton id={index} onClick={onClickRemove} color="secondary">
                X
              </IconButton>
            </ListItem>
          )
        }
      </List>
    </div>
  );
};

export default AddLessons;
