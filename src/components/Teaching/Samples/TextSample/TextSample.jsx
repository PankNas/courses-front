import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../../../axios";
import styles from "../VideoSample/VideoSample.module.scss";
import SimpleMDE from "react-simplemde-editor";
import {setDataTextSample, setDesc} from "../../../../redux/slices/sampleLesson";
import {useDispatch} from "react-redux";

const TextSample = ({desc}) => {
  const dispatch = useDispatch();

  const {sampleId} = useParams();

  useEffect(() => {
    if (!sampleId) {
      dispatch(setDataTextSample({
        title: '',
        desc: '',
      }));

      return;
    }

    axios
      .get(`lessons/${sampleId}`)
      .then(({data}) => {
        dispatch(setDataTextSample({
          title: data.title,
          desc: data.desc,
        }))
      });
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
