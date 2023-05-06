import React, {useEffect, useState} from 'react';

import styles from './TestSample.module.scss';

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "../../../../axios";
import {NavLink, Route, Routes, useNavigate, useParams} from "react-router-dom";
import ItemTest from "./ItemTest/ItemTest";
import {setDataTestSample, setItemsTest} from "../../../../redux/slices/sampleLesson";
import {useDispatch} from "react-redux";

const TestSample = ({itemsTest}) => {
  const dispatch = useDispatch();
  // const {sampleId} = useParams();

  const navigate = useNavigate();

  // const [item, setItem] = useState({
  //   id: '',
  //   question: '',
  //   answer: '',
  //   score: 1,
  //   options: [],
  // });
  // const [item, setItem] = useState(null);

  useEffect(() => {
    dispatch(setDataTestSample({
      title: '',
      itemsTest: [],
    }))
  }, []);

  const handleAddItem = async () => {
    try {
      const newItem = {
        id: `${Date.now()}`,
        question: '',
        options: new Array(4).fill(''),
        answer: '',
        score: 1,

        status: 0,
      };

      await dispatch(setItemsTest([...itemsTest, newItem]));

      navigate(`testItem/${newItem.id}`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании урока');
    }
  };
  const handleMoveItem = (event) => {
    const curItem = itemsTest.find(item => item.id === event.target.id)

    navigate(`testItem/${curItem.id}`);
  };

  return (
    <>
      <Grid container spacing={8} style={{marginBottom: '20px'}}>
        <Grid item xs={1}>
          <Button style={{padding: '0'}}>
            <div className={styles.moduleAddPlus} onClick={handleAddItem}>+</div>
          </Button>
        </Grid>
        {
          itemsTest.map((item, index) =>
            <Grid key={item.id} item xs={1}>
              <Button style={{padding: '0'}} onClick={handleMoveItem}>
                <div
                  id={item.id}
                  className={styles.moduleAddPlus}
                  style={{borderColor: item.status ? 'green' : 'red'}}
                >
                  {index}
                </div>
              </Button>
              {/*<Button style={{padding: '0'}} onClick={handleMoveItem}>*/}
              {/*  <div id={item.id} className={styles.moduleAddPlus}>{index}</div>*/}
              {/*</Button>*/}
            </Grid>
          )
        }
      </Grid>

      {/*{ item && <ItemTest item={item}/>}*/}

      <Routes>
        <Route path={'testItem/:itemId'} element={<ItemTest items={itemsTest}/>} />
      </Routes>
    </>
  );
};

export default TestSample;
