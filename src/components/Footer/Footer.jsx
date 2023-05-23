import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container footer-block">
        <img src={`http://localhost:8000/uploads/logo.png`} alt="logo" />
          <p className="footer-text">Copyright ©2023 All rights reserved | This template is made by Colorlib</p>
      </div>
    </div>
  )
}

export default Footer;
