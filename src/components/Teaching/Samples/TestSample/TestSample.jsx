import React, {useEffect, useState} from 'react';

import styles from './TestSample.module.scss';

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "../../../../axios";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import ItemTest from "./ItemTest/ItemTest";

const TestSample = () => {
  const {sampleId} = useParams();

  const [itemsTest, setItemsTest] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  const handleAddItem = async () => {
    try {
      const fields = {
        question: '',
        options: new Array(4).fill(''),
        answer: '',
        score: 1,
        test: sampleId,
      }

      const {data} = await axios.post("/lessons/test/item", fields);

      setItemsTest([...itemsTest, data]);

      navigate(`testItem/${data._id}`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании урока');
    }
  };
  const handleMoveItem = (event) => navigate(`testItem/${event.target.id}`)

  return (
    <>
      <Grid container spacing={8} style={{marginBottom: '20px'}}>
        <Grid item xs={1}>
          <Button style={{padding: '0'}} >
            <div className={styles.moduleAddPlus} onClick={handleAddItem}>+</div>
          </Button>
        </Grid>
        {
          itemsTest.map(item =>
            <Grid key={item._id} item xs={1}>
              <Button id={item._id} style={{padding: '0'}} onClick={handleMoveItem}>
                <div className={styles.moduleAddPlus}>T</div>
              </Button>
            </Grid>
          )
        }
      </Grid>

      <Routes>
        <Route path={'testItem/:itemId'} element={<ItemTest/>}/>
      </Routes>
    </>
  );
};

export default TestSample;
