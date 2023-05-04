import React, {useEffect, useState} from 'react';

import styles from './TestSample.module.scss';

import Editor from "../Editor";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "../../../../axios";
import {Outlet, Route, Routes, useNavigate, useParams} from "react-router-dom";
import ItemTest from "./ItemTest/ItemTest";

const itemTest = {
  id: '',
  question: '',
  options: [],
  answer: '',
  score: 1,
};

const TestSample = () => {
  const {id, sampleId} = useParams();

  const [itemsTest, setItemsTest] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // try {
    //   const createTest = async () => await axios.post("/lessons/test", {course: id});
    //
    //   const {data} = createTest();
    //
    //   navigate(`${data._id}`);
    // } catch (err) {
    //   console.warn(err);
    //
    //   alert('Ошибка при создании урока');
    // }
  }, []);

  const handleAddItem = async () => {
    try {
      const {data} = await axios.post("/lessons/test/item", {test: sampleId});

      setItemsTest([...itemsTest, data]);

      navigate(`testItem/${data._id}`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании урока');
    }
  };

  // const [arrTest, setArrTest] = useState([]);
  //
  // const [numQuestion, setNumQuestion] = useState(0);
  //
  // const handleChange = (event) => setNumQuestion(event.target.value);
  // const handleInputScore = (event) => {
  //   const index = arrTest.findIndex(item => item.id === event.target.id);
  //
  //   arrTest[index].score = event.target.value;
  //   console.log(arrTest[index]);
  // }
  // const handleBtnCreate = () => {
  //   if (arrTest.length === numQuestion) return;
  //
  //   if (arrTest.length > numQuestion) {
  //     setArrTest(arrTest.slice(0, numQuestion));
  //     return;
  //   }
  //
  //   const arr = new Array(numQuestion - arrTest.length).fill(itemTest);
  //   arr.forEach(item => item.id = `${Date.now()}`);
  //
  //   setArrTest([...arrTest, ...arr]);
  // }

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={1}>
          <Button style={{padding: '0'}} >
            <div className={styles.moduleAddPlus} onClick={handleAddItem}>+</div>
          </Button>
        </Grid>
        {
          itemsTest.map(item =>
            <Grid key={item._id} item xs={1}>
              <Button style={{padding: '0'}}>
                <div className={styles.moduleAddPlus}>T</div>
              </Button>
            </Grid>
          )
        }
      </Grid>

      <Routes>
        <Route path={'testItem/:itemId'} element={<ItemTest/>}/>
      </Routes>

      {/*<Outlet/>*/}

      {/*<div className={styles.numberQuestionBlock}>*/}
      {/*  <TextField*/}
      {/*    id={'numQuestion'}*/}
      {/*    type={'number'}*/}
      {/*    value={numQuestion}*/}
      {/*    label="Введите число вопросов в тесте"*/}
      {/*    onChange={handleChange}*/}
      {/*    variant="outlined"*/}
      {/*    style={{marginRight: '15px'}}*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    variant="outlined"*/}
      {/*    onClick={handleBtnCreate}*/}
      {/*  >*/}
      {/*    Создать*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {/*{*/}
      {/*  arrTest.map((item, index) =>*/}
      {/*    <div key={item.id} className={styles.itemTest}>*/}
      {/*      <TextField*/}
      {/*        id={item.id}*/}
      {/*        type={'number'}*/}
      {/*        value={item.score}*/}
      {/*        defaultValue={1}*/}
      {/*        label="Балл"*/}
      {/*        onChange={handleInputScore}*/}
      {/*        variant="outlined"*/}
      {/*      />*/}
      {/*      <Editor value={item.question} height={'100px'} placeholder={'Напишите вопрос'}/>*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*}*/}
    </>
  );
};

export default TestSample;
