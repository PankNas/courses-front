import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import styles from './Remark.module.css';
import {IconButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../App";

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
      {/*<button className={styles.button} onClick={handleSave}>Сохранить</button>*/}
      {/*<button className={styles.button} onClick={handleDel}>Удалить</button>*/}
    </>
  )
}

export default Remark;
