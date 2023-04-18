import React from 'react';

import styles from './Logo.module.css'

const Logo = () => {
  return (
    <div className={styles.root}>
      <img className={styles.img} src={''} alt='logo'/>
      <h1 className={styles.title}>Panda</h1>
    </div>
  )
};

export default Logo;
