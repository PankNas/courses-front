import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../../../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "../VideoSample/VideoSample.module.scss";
import SimpleMDE from "react-simplemde-editor";
import {setDataTextSample, setDesc, setWelcomeText} from "../../../../redux/slices/sampleReducer";
import {useDispatch} from "react-redux";

const TextSample = ({desc}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataTextSample({
      title: '',
      desc: '',
    }));
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      placeholder: "Введите описание урока...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }), []);

  const handleChangeEdit = React.useCallback((value) => dispatch(setDesc(value)), []);

  return (
    <SimpleMDE
      id={'desc-lesson'}
      className={styles.editor}
      value={desc}
      onChange={handleChangeEdit}
      options={options}
      style={{paddingRight: '30px', paddingLeft: '30px'}}
    />
  );
};

export default TextSample;
