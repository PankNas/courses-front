import Rect, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import React from "react";
import styles from './Remark.module.css';

const Remark = ({fnSave}) => {
  const [comment, setComment] = useState('');

  useEffect(() => {

  }, []);

  const handleChange = (event) => setComment(event.target.value);
  const handleSave = async () => fnSave(comment);
  const handleDel = () => {

  }

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
      />
      <button className={styles.button} onClick={handleSave}>Сохранить</button>
      <button className={styles.button} onClick={handleDel}>Удалить</button>
    </>
  )
}

export default Remark;
