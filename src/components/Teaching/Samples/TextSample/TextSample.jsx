import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../../../axios";
import {setDataTextSample, setDesc} from "../../../../redux/slices/sampleLesson";
import {useDispatch} from "react-redux";
import Editor from "../Editor";
import styles from '../Sample.module.css';
import RemarkTeach from "../RemarkTeach";
import {findRemark} from "../Sample";
import Remark from "../../../Remark/Remark";
import {setRemarks} from "../../CreateCourse/CreateCourse";

const TextSample = ({desc, remarks}) => {
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);

  const {sampleId, id} = useParams();
  // const [remark, setRemark] = useState('');
  let isStatus;

  useEffect(() => {
    if (!sampleId) {
      dispatch(setDataTextSample({
        title: '',
        desc: '',
        remarks: '',
      }));

      return;
    }

    const getLesson = async () => (await axios.get(`/lessons/${sampleId}`)).data;

    getLesson()
      .then(res => {

        setCourse(res);
        dispatch(setDataTextSample({
          title: res.title,
          desc: res.desc,
          remarks: res.remarks,
        }));

        isStatus = course?.status !== 'check' || course?.status !== 'moderate';
      });
  }, []);

  const updateDesc = (value) => dispatch(setDesc(value));

  return (
    <div className={styles.content}>
      <div style={{width: `700px`}}>
        <Editor
          value={desc}
          placeholder={'Введите описание урока...'}
          height={'400px'}
          fn={updateDesc}
        />
      </div>
      {
        (course?.status !== 'check' || course?.status !== 'moderate') &&
        <div style={{width: '350px'}}>{setRemarks(course?.remarks)}</div>
      }
    </div>
  );
};

export default TextSample;
