import React from 'react';

import styles from './Menu.module.css';

import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <Logo />
      <Navigation />
    </div>
  )
};

export default Menu;
