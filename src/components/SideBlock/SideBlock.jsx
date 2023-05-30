import React from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>
        {title}
      </h3>
      {children}
    </div>
  );
};
