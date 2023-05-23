import React from 'react';

import styles from './Navigation.module.css';
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const Navigation = () => {
  const {data} = useSelector(state => state.auth);

  const itemNavigate = [
    // {
    //   name: 'Главная',
    //   icon: '',
    //   navigate: '/',
    // },
    {
      name: 'Каталог',
      icon: '',
      flag: 'all',
      navigate: '/courses',
    },
    {
      name: 'Обучение',
      icon: '',
      flag: 'member',
      navigate: '/study',
    },
    {
      name: 'Преподавание',
      icon: '',
      flag: 'member',
      navigate: '/teach',
    },
    {
      name: 'Модерация',
      icon: '',
      flag: 'moderator',
      navigate: '/check',
    },
    {
      name: 'Мои проверки',
      icon: '',
      flag: 'moderator',
      navigate: '/check',
    }
  ];

  return (
    <List className={styles.nav}>
      {
        createList(itemNavigate, data)
      }
    </List>
  );
};

function createList(items, data) {
  let res = []

  items.forEach((item, index) => {
      if (data?.role === item.flag || item.flag === 'all')
        res.push(createListItem(item, index));

      // if (data?.role === 'moderator' && (item.name === 'Модерация' || item.name === 'Мои проверки' || item.name === 'Каталог'))
      //   res.push(createListItem(item, index));
    }
  )

  return res;
}

function createListItem(item, index) {
  return (
    <NavLink
      key={index}
      to={item.navigate}
      // className={({isActive}) => isActive ? styles.activeLink : styles.link}
    >
      <ListItem key={index}>
        <ListItemIcon/>
        <ListItemText primary={item.name}/>
      </ListItem>
    </NavLink>
  );
}

export default Navigation;
