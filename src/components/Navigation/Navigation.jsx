import React from 'react';

import styles from './Navigation.module.css';
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";

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
      navigate: '/study',
    },
    {
      name: 'Преподавание',
      icon: '',
      navigate: '/teach',
    }
  ];

  return (
    <List className={styles.nav}>
      {
        itemNavigate.map((item, index) =>
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
        )
      }
    </List>
  );
};

export default Navigation;
