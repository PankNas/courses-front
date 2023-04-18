import React from 'react';

import styles from './Navigation.module.css';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";

const Navigation = () => {
  const itemNavigate = [
    {
      name: 'Главная',
      icon: '',
      navigate: '/',
    },
    {
      name: 'Каталог',
      icon: '',
      navigate: '/courses',
    },
    {
      name: 'Моё обучение',
      icon: '',
      navigate: '/courses',
    },
    {
      name: 'Преподавание',
      icon: '',
      navigate: '/teach',
    },
    {
      name: 'Настройки',
      icon: '',
      navigate: '/settings',
    },
  ];

  return (
    <List classes={styles.nav}>
      {
        itemNavigate.map((item, index) =>
          <ListItem key={index}>
            <Link to={item.navigate}>
                <ListItemIcon />
                <ListItemText primary={item.name}/>
            </Link>
          </ListItem>
        )
      }
    </List>
  );
};

export default Navigation;
