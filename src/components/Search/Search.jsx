import React, {useState} from 'react';

import styles from './Search.module.css';
import SelectItem from "../SelectItem";
import {languages, levelLanguages} from "../languages";
import TextField from "@mui/material/TextField";

const Search = ({items, setCourses, fnSearch}) => {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState({
    level: '',
    language: ''
  });
  // const [courses, setCourses] = useState(items);

  const handleInput = (event) => setInput(event.target.value);
  const handleChangeLanguage = async (event) => {
    await setLanguage({...language, [event.target.id]: event.target.value});
  }

  const handleSearch = () => {
    let search = items?.filter(item => item?.title?.includes(input.toLowerCase().trim()));
    // search = search.filter(item => item.language === language.language);
    // search = search.filter(item => item.levelLanguage === language.level);
    console.log('or', search, items, input);

    if (language.language !== '') {
      search = search?.filter(item => item.language === language.language);
    }

    if (language.level !== '') {
      search = search?.filter(item => item.levelLanguage === language.level);
    }
    console.log('hi', search);

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
