import React, {useState} from "react";

import styles from "./style.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import axios from "../../axios";
import {useParams} from "react-router-dom";

const AddComment = ({fnUpdate}) => {
  const {courseId, lessonId} = useParams();
  const {data} = useSelector(state => state.auth);

  const [comment, setComment] = useState('');

  const handleChangeComment = (event) => setComment(event.target.value);
  const handleSend = async () => {
    if (comment === '') return;

    try {
      const dateTime = setDate();

      let newComment = {
        text: comment,
        dateTime: dateTime,
      }

      if (lessonId)
        newComment.lesson = lessonId;
      else
        newComment.course = courseId;

      const {data} = await axios.post(`/comments`, newComment);

      fnUpdate(data);
      setComment('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`http://localhost:8000${data?.avatarUrl}`}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            value={comment}
            onChange={handleChangeComment}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <button className={styles.button} onClick={handleSend}>Отправить</button>
        </div>
      </div>
    </>
  );
};

export function setDate() {
  const date = new Date();

  return date.toLocaleString().slice(0, -3);
}

export default AddComment;
