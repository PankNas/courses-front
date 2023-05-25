import React, {useState} from 'react';

import styles from './ItemTest.module.scss';
import {useDispatch} from "react-redux";
import TextField from "@mui/material/TextField";
import Editor from "../../Editor";
import {Checkbox, FormControlLabel, FormGroup, IconButton} from "@mui/material";
import {setItemsTest} from "../../../../../redux/slices/sampleLesson";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../../../../App";

const ItemTest = ({items, curItem}) => {
  const dispatch = useDispatch();

  const [item, setItem] = useState(curItem);

  const handleInputScore = (event) => setItem({...item, score: +event.target.value});
  const handleChangeOption = (event) => {
    const options = item.options.slice();
    options[event.target.id] = event.target.value;

    setItem({...item, options: options});
  };
  const handleDelItem = () => {
    const newArr = items.filter((elem => elem.id !== curItem.id));

    dispatch(setItemsTest(newArr));
  };
  const handleSaveItem = () => {
    const index = items.findIndex(elem => elem.id === item.id);
    const copyItems = items.slice();

    copyItems[index] = item;
    dispatch(setItemsTest(copyItems));

    alert('Пункт теста сохранен');
  };
  const handleChangeCheckBox = (event, index) => {
    setItem({...item, answer: index});
  };
  const isChecked = (index) => index === item.answer;
  const updateQuestion = (value) => setItem({...item, question: value});

  return (
    <div className={styles.itemTest}>
      <div className={styles.headerItem}>
        <TextField
          value={item.score}
          label="Балл"
          onChange={handleInputScore}
          variant="outlined"
          style={{marginRight: '20px'}}
          pattern={/^[1-9]\d*$/}
        />
        <IconButton style={{padding: '0', marginRight: '20px'}} onClick={handleSaveItem}>
          <Avatar src={`${pathFolder}/my/done.svg`}/>
        </IconButton>
        <IconButton style={{padding: '0'}} onClick={handleDelItem}>
          <Avatar src={`${pathFolder}/my/delete.svg`}/>
        </IconButton>
      </div>
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
                  checked={isChecked(index)}
                  onChange={(event) => handleChangeCheckBox(event, index)}/>
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
