import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import styles from "./AddLessons.module.css";

import {Menu, MenuItem, Button, List, ListItem, ListItemIcon, ListItemText, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchLessons, fetchRemoveLesson, setTitle} from "../../../redux/slices/lessons";
import {setType} from "../../../redux/slices/sampleLesson";
import TextField from "@mui/material/TextField";

import axios from '../../../axios';

const AddLessons = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {modules} = useSelector(state => state.lessons);
  const [anchorEls, setAnchorEls] = useState(Array(modules.length).fill(null));

  const handleClick = (index, event) => {
    const newAnchorEls = [...anchorEls];             // создаем новый массив якорей
    newAnchorEls[index] = event.currentTarget;      // устанавливаем соответствующий якорь для элемента меню
    setAnchorEls(newAnchorEls);                      // обновляем состояние якорей
  };

  const handleMove = (event) => {
    dispatch(setType(event.target.id));

    const dataIndex = event.currentTarget.getAttribute('data-index');
    console.log(dataIndex, modules[dataIndex]._id);
    const newAnchorEls = [...anchorEls];
    newAnchorEls[dataIndex] = null; // сброс якоря после закрытия списка меню
    setAnchorEls(newAnchorEls);

    navigate(`module/${modules[dataIndex]._id}/sample`);
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

    // setModules(prev => [...prev, data]);
    dispatch(fetchLessons(id));
  };

  const handleChangeTitle = (event) => {
    // modules[+event.target.id].title = event.target.value;

    // setModules(modules);
    dispatch(setTitle({id: +event.target.id, value: event.target.value}));
  };

  useEffect(() => {
    dispatch(fetchLessons(id));
  }, []);

  return (
    <div style={{marginBottom: '20px'}}>
      <p>Программа курса</p>
      <Button variant="outlined" onClick={handleAddModel} style={{}}>
        + Новый модуль
      </Button>

      <div style={{marginTop: "15px"}}>
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
                <Button
                  style={{padding: '0'}}
                  className={styles.moduleAdd}
                  onClick={(e) => handleClick(index, e)}
                  aria-controls={`simple-menu-${index}`}
                  aria-haspopup="true"
                >
                  + Добавить урок
                </Button>
                <Menu
                  id={`simple-menu-${index}`}
                  anchorEl={anchorEls[index]} // используем соответствующий якорь для элемента меню
                  keepMounted
                  open={Boolean(anchorEls[index])}
                  onClose={handleMove}
                  PaperProps={{ sx: { width: '650px' } }}
                >
                  <MenuItem id={`text`} data-index={index} onClick={handleMove}>Теория</MenuItem>
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
    </div>
  );
};

export default AddLessons;
