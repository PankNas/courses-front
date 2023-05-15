import React, {useEffect} from 'react';

import styles from './TestSample.module.scss';

import Button from "@mui/material/Button";
import axios from "../../../../axios";
import {useParams} from "react-router-dom";
import ItemTest from "./ItemTest/ItemTest";
import {setDataTestSample, setItemsTest} from "../../../../redux/slices/sampleLesson";
import {useDispatch} from "react-redux";

const TestSample = ({itemsTest}) => {
  const {sampleId} = useParams();
  const dispatch = useDispatch();

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
    <>
      <Button style={{padding: '0'}}>
        <div className={styles.moduleAddPlus} onClick={handleAddItem}>+</div>
      </Button>

      {
        itemsTest.map((item) =>
          <ItemTest key={item.id} items={itemsTest} curItem={item}/>
        )
      }
    </>
  );
};

export default TestSample;
