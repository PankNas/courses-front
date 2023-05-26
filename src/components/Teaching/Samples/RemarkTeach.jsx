import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
// import styles from './Remark.module.css';
import {IconButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
// import {pathFolder} from "../../App";
import {useParams} from "react-router-dom";
// import axios from "../../axios";

const RemarkTeach = ({value, rowsCount}) => {
  // const {courseId, lessonId} = useParams();

  // const [comment, setComment] = useState('');
  //
  // useEffect(() => {
  //   const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;
  //
  //   getCourse()
  //     .then(res => {
  //       if (isCourse) {
  //         setComment(res.remarkForCourse)
  //       } else {
  //         const remark = res.remarks.find(item => item.id === lessonId);
  //         console.log('rem', res, remark);
  //         if (!remark) {
  //           setComment('');
  //         } else {
  //           setComment(remark.text);
  //         }
  //       }
  //     })
  // }, [lessonId]);
  console.log('remark', value);

  return (
    <>
      <TextField
        id={'desc-course'}
        value={value}
        label="Замечания от проверяющего"
        multiline
        rows={rowsCount}
        // onChange={handleChange}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true, // делаем поле только для чтения
        }}
        style={{marginBottom: '20px'}}
      />
    </>
  )
}

export default RemarkTeach;
