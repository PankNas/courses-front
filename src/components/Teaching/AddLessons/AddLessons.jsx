import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import styles from "./AddLessons.module.css";

import {Menu, MenuItem, Button, List, ListItem, ListItemIcon, ListItemText, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchLessons, fetchRemoveLesson, fetchRemoveModule, setTitle} from "../../../redux/slices/lessons";
import {setType} from "../../../redux/slices/sampleLesson";
import TextField from "@mui/material/TextField";

import axios from '../../../axios';
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../../App";

const AddLessons = ({title, desc, language, levelLanguage, imageUrl, status}) => {
  // const {course} = useSelector(state => state.lessons);

  const {id} = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {modules} = useSelector(state => state.lessons);
  const [anchorEls, setAnchorEls] = useState(Array(modules?.length).fill(null));

  const handleClick = async (index, event) => {
    const newAnchorEls = [...anchorEls];             // создаем новый массив якорей
    newAnchorEls[index] = event.currentTarget;      // устанавливаем соответствующий якорь для элемента меню
    setAnchorEls(newAnchorEls);                      // обновляем состояние якорей

    const fields = {
      title,
      imageUrl,
      desc,
      language,
      levelLanguage,
      status: 'passive'
    };

    for (const module of modules) {
      await axios.patch(`/modules/${module._id}`, module);
    }

    await axios.patch(`/courses/update/${id}`, fields);
  };

  const handleMove = async (event) => {
    try {
      dispatch(setType(event.target.id));

      const dataIndex = event.currentTarget.getAttribute('data-index');
      const newAnchorEls = [...anchorEls];
      newAnchorEls[dataIndex] = null; // сброс якоря после закрытия списка меню
      setAnchorEls(newAnchorEls);

      navigate(`module/${modules[dataIndex]._id}/sample`);

      // console.log(id, course);
      // await axios.patch(`/courses/${id}`, course);
    } catch (err) {
      const newAnchorEls = [...anchorEls];
      setAnchorEls(newAnchorEls);
      console.log('error');
    }
  };

  const onClickRemove = (event, indexModule, indexLesson) => {
    if (!window.confirm("Вы действительно хотите удалить урок?")) return;

    try {
      // const dataIndex = event.currentTarget.getAttribute('data-index');
      //
      // dispatch(fetchRemoveLesson(modules[dataIndex].lessons[event.target.id]._id));
      // dispatch(fetchLessons(course.id));

      // const dataIndex = event.currentTarget.getAttribute('data-index');

      dispatch(fetchRemoveLesson(modules[indexModule].lessons[indexLesson]._id));
      dispatch(fetchLessons(id));
    } catch (err) {
    }
  };
  const onClickRemoveModule = (event, indexModule) => {
    if (!window.confirm("Вы действительно хотите удалить модуль?")) return;

    try {
      dispatch(fetchRemoveModule(modules[indexModule]._id));
      dispatch(fetchLessons(id));

    } catch (err) {

    }
  };

  const onClickEdit = async (event, indexModule, indexLesson) => {
    for (const module of modules) {
      await axios.patch(`/modules/${module._id}`, module);
    }

    const fields = {
      title,
      imageUrl,
      desc,
      language,
      levelLanguage,
      status: 'passive'
    };

    await axios.patch(`/courses/update/${id}`, fields);

    dispatch(setType(modules[indexModule].lessons[indexLesson].type));

    navigate(`module/${modules[indexModule]._id}/sample/${modules[indexModule].lessons[indexLesson]._id}`);


    // const item = items[event.target.id];

    // const dataIndex = event.currentTarget.getAttribute('data-index');
    //
    // dispatch(setType(modules[dataIndex].lessons[event.target.id].type));
    //
    // navigate(`module/${modules[dataIndex]._id}/sample/${modules[dataIndex].lessons[event.target.id]._id}`);
    //
    // // navigate(`sample/${item._id}`);
  };

  const handleAddModel = async () => {
    const {data} = await axios.post("/modules", {course: id});

    // setModules(prev => [...prev, data]);
    dispatch(fetchLessons(id));
  };

  const handleChangeTitle = (event) => {
    console.log(event.target.id, modules, 'hello');
    // modules[+event.target.id].title = event.target.value;

    // setModules(modules);
    dispatch(setTitle({id: +event.target.id, value: event.target.value}));
  };

  useEffect(() => {
    dispatch(fetchLessons(id));
  }, []);

  const selectIcon = (type) => {
    switch (type) {
      case 'text':
        return 'description';
      case 'video':
        return 'play';
      case 'test':
        return 'description';
      case 'passes':
        return 'description';
      case 'translate':
        return 'translate';
      case 'sentence':
        return 'description';
    }
  };

  return (
    <div style={{marginBottom: '20px'}}>
      <div className={styles.header}>
        <p style={{margin: '0', fontSize: '22px'}}>Программа курса</p>
        <button
          onClick={handleAddModel}
          className={styles.addCourse}
          style={{fontSize: '22px'}}
        >
          + Новый модуль
        </button>

        <div style={{marginTop: "15px"}}>
          {
            modules?.map((block, index) =>
              <div key={block._id} className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <p style={{padding: "10px", fontSize: '22px'}}>{index + 1}</p>
                  <TextField
                    id={`${index}`}
                    value={block.title}
                    label="Название модуля"
                    onChange={handleChangeTitle}
                    variant="outlined"
                    style={{marginBottom: '20px', marginTop: '20px', width: "90%", fontSize: '22px'}}
                  />
                  <IconButton id={index} onClick={(event) => onClickRemoveModule(event, index)} color="error">
                    <Avatar src={`${pathFolder}/my/delete.svg`}/>
                  </IconButton>
                </div>

                <List>
                  {
                    block?.lessons?.map((item, indexLesson) =>
                      <ListItem key={index} className={styles.lessonsItem}>
                        <ListItemIcon>
                          <Avatar src={`${pathFolder}/my/${selectIcon(item.type)}.svg`}/>
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            <span style={{color: 'red', fontSize: '22px'}}>
                              {
                                (status !== 'check' || status !== 'moderate') &&
                                setRemarks(item.remarks)
                              }
                            </span>
                          }
                        />
                        <IconButton onClick={(event) => onClickEdit(event, index, indexLesson)}>
                          <Avatar src={`${pathFolder}/my/edit.svg`}/>
                        </IconButton>
                        <IconButton onClick={(event) => onClickRemove(event, index, indexLesson)}>
                          <Avatar src={`${pathFolder}/my/delete.svg`}/>
                        </IconButton>
                      </ListItem>
                    )
                  }
                </List>

                <div style={{marginTop: "15px"}}>
                  <button
                    // style={{padding: '0'}}
                    style={{fontSize: '22px'}}
                    className={styles.button}
                    onClick={(e) => handleClick(index, e)}
                    aria-controls={`simple-menu-${index}`}
                    aria-haspopup="true"
                  >
                    + Добавить урок
                  </button>
                  <Menu
                    id={`simple-menu-${index}`}
                    anchorEl={anchorEls[index]} // используем соответствующий якорь для элемента меню
                    keepMounted
                    open={Boolean(anchorEls[index])}
                    onClose={handleMove}
                    PaperProps={{sx: {width: '650px', fontSize: '22px'}}}
                    // ref={menuRef}
                  >
                    <MenuItem id={`text`} data-index={index} onClick={handleMove}>Теория</MenuItem>
                    <MenuItem id={'video'} data-index={index} onClick={handleMove}>Видео</MenuItem>
                    <MenuItem id={'sentence'} data-index={index} onClick={handleMove}>Составить текст</MenuItem>
                    <MenuItem id={'passes'} data-index={index} onClick={handleMove}>Пропуски</MenuItem>
                    <MenuItem id={'test'} data-index={index} onClick={handleMove}>Тест</MenuItem>
                    <MenuItem id={'translate'} data-index={index} onClick={handleMove}>Перевод</MenuItem>
                  </Menu>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

function setRemarks(remarks) {
  return remarks.find(remark => remark !== '') ? 'Есть замечания!' : undefined;
}

export default AddLessons;
