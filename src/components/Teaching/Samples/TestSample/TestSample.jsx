import React, {useEffect, useState} from 'react';

import styles from './TestSample.module.scss';
import stylesSample from '../Sample.module.css';

import Button from "@mui/material/Button";
import axios from "../../../../axios";
import {useParams} from "react-router-dom";
import ItemTest from "./ItemTest/ItemTest";
import {setDataTestSample, setItemsTest} from "../../../../redux/slices/sampleLesson";
import {useDispatch} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../../../App";
import {IconButton} from "@mui/material";
import RemarkTeach from "../RemarkTeach";
import {findRemark} from "../Sample";

const TestSample = ({itemsTest}) => {
  const {sampleId, id} = useParams();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);


  useEffect(() => {
    if (!sampleId) {
      dispatch(setDataTestSample({
        title: '',
        itemsTest: [],
        totalScore: 0,
      }));

      return;
    }

    axios
      .get(`lessons/${sampleId}`)
      .then(({data}) => {
        setCourse(data)
        dispatch(setDataTestSample({
          title: data.title,
          itemsTest: data.itemsTest,
          totalScore: data.totalScore,
        }))
      });
  }, []);

  const handleAddItem = async () => {
    try {
      const newItem = {
        id: `${Date.now()}`,
        question: '',
        options: new Array(4).fill(''),
        answer: '',
        score: 1,
      };

      await dispatch(setItemsTest([...itemsTest, newItem]));
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании урока');
    }
  };

  return (
    <div className={stylesSample.content}>
      <div style={{width: '700px'}}>
        <IconButton
          onClick={handleAddItem}
          // className={styles.addCourse}
        >
          <Avatar src={`${pathFolder}/my/add.svg`}/>
        </IconButton>

        {
          itemsTest.map((item) =>
            <ItemTest key={item.id} items={itemsTest} curItem={item}/>
          )
        }
      </div>

      {
        course?.remarks !== '' &&
        <div style={{width: '350px'}}><RemarkTeach value={course?.remarks} rowsCount={15}/></div>
      }
    </div>
  );
};

export default TestSample;
