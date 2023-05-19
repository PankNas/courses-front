import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import styles from "./AddLessons.module.css";

import {Menu, MenuItem, Button, List, ListItem, ListItemIcon, ListItemText, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchLessons, fetchRemoveLesson} from "../../../redux/slices/lessons";
import {setType} from "../../../redux/slices/sampleLesson";
import TextField from "@mui/material/TextField";

import axios from '../../../axios';

const AddLessons = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const {items} = useSelector(state => state.lessons);
  const [anchorEl, setAnchorEl] = useState(null);

  const [modules, setModules] = useState([]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleMove = (event) => {
    setAnchorEl(null);

    dispatch(setType(event.target.id));
    navigate(`module/${event.target.data-id}/sample`);
  };
  const onClickRemove = (event) => {
    if (!window.confirm("Вы действительно хотите удалить урок?")) return;

    // try {
    //   dispatch(fetchRemoveLesson(items[event.target.id]._id));
    // } catch (err) {
    //
    // }
  };
  const onClickEdit = (event) => {
    // const item = items[event.target.id];
    //
    // dispatch(setType(item.type));
    // navigate(`sample/${item._id}`);
  };

  const handleAddModel = async () => {
    const {data} = await axios.post("/modules", {course: id});

    setModules(prev => [...prev, data]);
  }

  const handleChangeTitle = (event) => {
    modules[+event.target.id].title = event.target.value;

    setModules(modules);
  }

  useEffect(() => {
    dispatch(fetchLessons(id));
  }, []);

  return (
    <div style={{marginBottom: '20px'}}>
      <p>Программа курса</p>
      <Button variant="outlined" onClick={handleAddModel} style={{}}>
        + Новый модуль
      </Button>

      <div>
        {
          modules?.map((block, index) =>
            <div key={index} className={styles.module}>
              <span style={{marginLeft: "10px"}}>{index + 1}</span>
              <TextField
                id={`${index}`}
                value={block.title}
                label="Название модуля"
                onChange={handleChangeTitle}
                variant="outlined"
                fullWidth
                style={{marginBottom: '20px', marginTop: '20px'}}
              />

              <List className={styles.lessons}>
                {
                  block.lessons?.map((item, index) =>
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

              <div style={{marginTop: "15px"}}>
                <Button style={{padding: '0'}} className={styles.moduleAdd} onClick={handleClick}>
                  + Добавить урок
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMove}
                  PaperProps={{sx: {width: '650px'}}}
                >
                  <MenuItem id={`text`} data-id={block._id} onClick={handleMove}>Теория</MenuItem>
                  <MenuItem id={'video'} data-id={block._id} onClick={handleMove}>Видео</MenuItem>
                  <MenuItem id={'sentence'} data-id={block._id} onClick={handleMove}>Составить текст</MenuItem>
                  <MenuItem id={'passes'} data-id={block._id} onClick={handleMove}>Пропуски</MenuItem>
                  <MenuItem id={'test'} data-id={block._id} onClick={handleMove}>Тест</MenuItem>
                  <MenuItem id={'translate'} data-id={block._id} onClick={handleMove}>Перевод</MenuItem>
                </Menu>
              </div>
            </div>
          )
        }
      </div>

      {/*<Button style={{padding: '0'}} className={styles.moduleAdd} onClick={handleClick}>*/}
      {/*  <div className={styles.moduleAddPlus}>+</div>*/}
      {/*  <p className={styles.moduleAddText}>Добавить урок</p>*/}
      {/*</Button>*/}
      {/*<Menu*/}
      {/*  id="simple-menu"*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  keepMounted*/}
      {/*  open={Boolean(anchorEl)}*/}
      {/*  onClose={handleMove}*/}
      {/*  PaperProps={{sx: {width: '650px'}}}*/}
      {/*>*/}
      {/*  <MenuItem id={`text`} onClick={handleMove}>Теория</MenuItem>*/}
      {/*  <MenuItem id={'video'} onClick={handleMove}>Видео</MenuItem>*/}
      {/*  <MenuItem id={'sentence'} onClick={handleMove}>Составить текст</MenuItem>*/}
      {/*  <MenuItem id={'passes'} onClick={handleMove}>Пропуски</MenuItem>*/}
      {/*  <MenuItem id={'test'} onClick={handleMove}>Тест</MenuItem>*/}
      {/*  <MenuItem id={'translate'} onClick={handleMove}>Перевод</MenuItem>*/}
      {/*</Menu>*/}

      {/*<List className={styles.lessons}>*/}
      {/*  {*/}
      {/*    items.map((item, index) =>*/}
      {/*      <ListItem key={index} className={styles.lessonsItem}>*/}
      {/*        <ListItemIcon/>*/}
      {/*        <ListItemText primary={item.title}/>*/}
      {/*        <IconButton id={index} onClick={onClickEdit} color="secondary">*/}
      {/*          E*/}
      {/*        </IconButton>*/}
      {/*        <IconButton id={index} onClick={onClickRemove} color="secondary">*/}
      {/*          X*/}
      {/*        </IconButton>*/}
      {/*      </ListItem>*/}
      {/*    )*/}
      {/*  }*/}
      {/*</List>*/}
    </div>
  );
};

export default AddLessons;
