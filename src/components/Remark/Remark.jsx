import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import styles from './Remark.module.css';
import {IconButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../App";
import {useParams} from "react-router-dom";
import axios from "../../axios";

const Remark = ({fnSave, fnDelete, isCourse, rowsCount, isRead = false}) => {
  const {courseId, lessonId} = useParams();

  const [comment, setComment] = useState('');

  useEffect(() => {
    if (isCourse) {
      const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;
      getCourse()
        .then(res => setComment(res?.remarkForCourse || ''))
    } else {
      const getLesson = async () => (await axios.get(`/lessons/${lessonId}`)).data;
      getLesson()
        .then(res => setComment(res?.remarks || ''))
    }

    // const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;
    //
    // getCourse()
    //   .then(res => {
    //     if (isCourse) {
    //       setComment(res.remarkForCourse)
    //     } else {
    //       const remark = res.remarks.find(item => item.id === lessonId);
    //       console.log('rem', res, remark);
    //       if (!remark) {
    //         setComment('');
    //       } else {
    //         setComment(remark.text);
    //       }
    //     }
    //   })
  }, [lessonId]);

  const handleChange = (event) => setComment(event.target.value);
  const handleSave = async () => fnSave(comment);
  const handleDel = () => fnDelete()

  return (
    <>
      <TextField
        id={'desc-course'}
        value={comment}
        label="Замечания от проверяющего"
        multiline
        rows={rowsCount}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: isRead, // делаем поле только для чтения
        }}
        style={{marginBottom: '20px'}}
      />
      {
        !isRead &&
        <>
          <div className={styles.buttonBlock}>
            <IconButton style={{padding: '0', marginRight: '20px'}} onClick={handleSave}>
              <Avatar src={`${pathFolder}/my/done.svg`}/>
            </IconButton>
            {/*<IconButton style={{padding: '0'}} onClick={handleDel}>*/}
            {/*  <Avatar src={`${pathFolder}/my/delete.svg`}/>*/}
            {/*</IconButton>*/}
          </div>
        </>
      }
    </>
  )
}

export default Remark;
