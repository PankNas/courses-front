import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import styles from './Remark.module.css';
import {IconButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../App";
import {useParams} from "react-router-dom";
import axios from "../../axios";

const Remark = ({fnSave, fnDelete, isCourse}) => {
  const {courseId, lessonId} = useParams();

  const [comment, setComment] = useState('');

  useEffect(() => {
    const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;

    getCourse()
      .then(res => {
        if (isCourse) {
          setComment(res.remarkForCourse)
        } else {
          const remark = res.remarks.find(item => item._id === lessonId);

          if (!remark) return;

          setComment(remark.text)
        }
      })
  }, []);

  const handleChange = (event) => setComment(event.target.value);
  const handleSave = async () => fnSave(comment);
  const handleDel = () => fnDelete()

  return (
    <>
      <TextField
        id={'desc-course'}
        value={comment}
        label="Замечание"
        multiline
        rows={5}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        style={{marginBottom: '20px'}}
      />
      <div className={styles.buttonBlock}>
        <IconButton style={{padding: '0', marginRight: '20px'}} onClick={handleSave}>
          <Avatar src={`${pathFolder}/my/done.svg`}/>
        </IconButton>
        <IconButton style={{padding: '0'}} onClick={handleDel}>
          <Avatar src={`${pathFolder}/my/delete.svg`}/>
        </IconButton>
      </div>
    </>
  )
}

export default Remark;
