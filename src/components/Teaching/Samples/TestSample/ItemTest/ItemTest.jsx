import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";

import styles from './ItemTest.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchItemTest, setOption, setScore} from "../../../../../redux/slices/itemTest";
import TextField from "@mui/material/TextField";
import Editor from "../../Editor";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {setItemsTest} from "../../../../../redux/slices/sampleLesson";
import Button from "@mui/material/Button";

const ItemTest = ({items}) => {
  const dispatch = useDispatch();
  const {itemId} = useParams();

  const [item, setItem] = useState(items[0]);

  useEffect(() => {
    const curItem = items.find(elem => elem.id === itemId);

    setItem(curItem);
  }, [itemId]);

  const handleInputScore = (event) => setItem({...item, score: +event.target.value});
  const handleChangeOption = (event) => {
    const options = item.options.slice();
    options[event.target.id] = event.target.value;

    setItem({...item, options: options});
  }
  const handleDelItem = () => {
    const newArr = items.filter((item => item.id !== itemId));

    dispatch(setItemsTest(newArr));
  }
  const handleSaveItem = () => {
    setItem({...item, status: 1});
    console.log(item);

    const index = items.findIndex(elem => elem.id === item.id);
    const copyItems = items.slice();

    copyItems[index] = item;
    dispatch(setItemsTest(copyItems));
  }

  return (
    <div className={styles.itemTest}>
      <TextField
        type={'number'}
        value={item.score}
        label="Балл"
        onChange={handleInputScore}
        variant="outlined"
      />
      <Button variant="outlined" onClick={handleSaveItem}>С</Button>
      <Button variant="outlined" onClick={handleDelItem}>У</Button>
      <Editor
        value={item.question}
        height={'100px'}
        placeholder={'Напишите вопрос'}
      />
      <FormGroup>
        {
          item.options?.map((option, index) =>
            <FormControlLabel key={index} control={<Checkbox defaultChecked={index === 0}/>} label={
              <input
                id={index}
                className={styles.optionItem}
                type="text"
                placeholder={`Ответ ${index + 1}`}
                value={option}
                onChange={handleChangeOption}
              />
            }/>
          )
        }
      </FormGroup>
    </div>
  );
};

export default ItemTest;
