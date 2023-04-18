import React from 'react';

import styles from './PersonalInfo.module.css'
import Avatar from "@mui/material/Avatar";

const PersonalInfo = () => {
  return (
    <div className={styles.personalInfo}>
      <span className={styles.avatar}>
        <Avatar src={''} sx={{ width: 100, height: 100 }} />
      </span>
      <p className={styles.fullName}>Иван Иванов</p>
    </div>
  )
};

export default PersonalInfo;
