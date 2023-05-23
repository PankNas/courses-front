import React from 'react';
import styles from './Footer.module.css';
import cn from 'classnames';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={cn(styles.container, styles.footerBlock)}>
        <img src={`http://localhost:8000/uploads/my/logo.png`} alt="logo" />
          <p className={styles.text}>Copyright ©2023 All rights reserved | This template is made by Colorlib</p>
      </div>
    </div>
  )
}

export default Footer;
