import React, {useEffect, useState} from 'react';

import styles from './Search.module.css';
import SelectItem from "../SelectItem";
import {languages, levelLanguages} from "../languages";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {setLevel, setLanguage as updateLanguage} from "../../redux/slices/lessons";

const Search = ({items, setCourses, fnSearch}) => {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState({
    level: '',
    language: ''
  });
  const data = useSelector(state => state.lessons);
  const dispatch = useDispatch();

  useEffect(() => {
    let search = items;

    if (data.language !== '') {
      search = search?.filter(item => item.language === data.language);
      fnSearch(search, true)
      setLanguage({
        level: '',
        language: data.language
      })
      dispatch(updateLanguage(''))
    } else if (data.level !== '') {
      search = search?.filter(item => item.levelLanguage === data.level);
      fnSearch(search, true)
      setLanguage({
        level: data.level,
        language: ''
      })
      dispatch(setLevel(''))
    }

    // fnSearch(search, true)
  }, []);

  const handleInput = (event) => setInput(event.target.value);
  const handleChangeLanguage = async (event) => {
    await setLanguage({...language, [event.target.id]: event.target.value});
  }

  const handleSearch = () => {
    let search = items?.filter(item => {
      const title = item?.title.toLowerCase().trim();

      return title.includes(input.toLowerCase().trim());
    });

    if (language.language !== '') {
      search = search?.filter(item => item.language === language.language);
    }

    if (language.level !== '') {
      search = search?.filter(item => item.levelLanguage === language.level);
    }

    fnSearch(search, true)
    // setCourses(search);
  }
  const handleClear = () => {
    // fnUpdate(items)
    fnSearch([], false)

    // setCourses(items);
    setInput('');
    setLanguage({
      level: '',
      language: ''
    })
  }

  return (
    <div className={styles.searchBox}>
      <img
        src={`http://localhost:8000/uploads/my/search.svg`}
        alt="search-glass"
        className={styles.searchGlass}
      />
      <TextField
        id="search-input"
        value={input}
        onChange={handleInput}
        className={styles.searchInput}
        type="search"
        placeholder="Введите название курса...."
      />
      <SelectItem
        id={'language'}
        options={languages}
        label={'Язык'}
        value={language.language}
        onChange={handleChangeLanguage}
      />
      <SelectItem
        id={'level'}
        options={levelLanguages}
        label={'Уровень'}
        value={language.level}
        onChange={handleChangeLanguage}
      />
      <button
        onClick={handleSearch}
        className={styles.button}
      >
        Найти
      </button>
      <button
        onClick={handleClear}
        className={styles.button}
      >
        Очистить
      </button>
    </div>
  )
};


export default Search;
