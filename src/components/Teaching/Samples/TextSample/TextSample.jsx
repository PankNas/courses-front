import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../../../axios";
import {setDataTextSample, setDesc} from "../../../../redux/slices/sampleLesson";
import {useDispatch} from "react-redux";
import Editor from "../Editor";

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

  const updateDesc = (value) => dispatch(setDesc(value));

  return (
    <Editor
      value={desc}
      placeholder={'Введите описание урока...'}
      height={'400px'}
      fn={updateDesc}
    />
  );
};

export default TextSample;
