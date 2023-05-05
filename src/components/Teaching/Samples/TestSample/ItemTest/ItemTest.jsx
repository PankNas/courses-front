import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

import styles from './ItemTest.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchItemTest, setScore} from "../../../../../redux/slices/itemTest";
import TextField from "@mui/material/TextField";
import Editor from "../../Editor";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

const ItemTest = () => {
  const {itemId} = useParams();
  const dispatch = useDispatch();
  const {item} = useSelector(state => state.itemTest);

  useEffect(() => {
    dispatch(fetchItemTest(itemId));
  }, [itemId]);

  const handleInputScore = (event) => dispatch(setScore(event.target.value));

  return (
    <div className={styles.itemTest}>
      <TextField
        type={'number'}
        value={item.score}
        defaultValue={1}
        label="Балл"
        onChange={handleInputScore}
        variant="outlined"
      />
      <Editor
        value={item.question}
        height={'100px'}
        placeholder={'Напишите вопрос'}
      />
      <FormGroup>
        {
          item?.options?.map((option, index) =>
            <FormControlLabel key={index} control={<Checkbox defaultChecked={index === 0}/>} label={
              <input
                id={index}
                className={styles.optionItem}
                type="text"
                placeholder={`Ответ ${index + 1}`}
                value={option}
              />
            }/>
          )
        }
      </FormGroup>
    </div>
  );
};

export default ItemTest;
