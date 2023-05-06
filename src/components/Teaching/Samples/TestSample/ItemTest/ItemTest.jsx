import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import styles from './ItemTest.module.scss';
import {useDispatch} from "react-redux";
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
  };
  const handleDelItem = () => {
    const newArr = items.filter((item => item.id !== itemId));

    dispatch(setItemsTest(newArr));
  };
  const handleSaveItem = () => {
    const index = items.findIndex(elem => elem.id === item.id);
    const copyItems = items.slice();

    copyItems[index] = item;
    dispatch(setItemsTest(copyItems));
  };
  const handleChangeCheckBox = (event, index) => {
    setItem({...item, answer: index});
  };
  const isChecked = (index) => index === item.answer;
  const updateQuestion = (value) => setItem({...item, question: value});

  return (
    <div className={styles.itemTest}>
      <TextField
        value={item.score}
        label="Балл"
        onChange={handleInputScore}
        variant="outlined"
        style={{marginRight: '20px'}}
        pattern={/^[1-9]\d*$/}
      />
      <Button
        variant="outlined"
        onClick={handleSaveItem}
        style={{marginRight: '20px'}}
      >
        С
      </Button>
      <Button variant="outlined" onClick={handleDelItem}>У</Button>
      <Editor
        value={item.question}
        height={'100px'}
        placeholder={'Напишите вопрос'}
        fn={updateQuestion}
      />
      <FormGroup>
        {
          item.options?.map((option, index) =>
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  id={index}
                  // defaultChecked={index === 0}
                  checked={isChecked(index)}
                  onChange={(event) => handleChangeCheckBox(event, index)} />
              }
              label={
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
