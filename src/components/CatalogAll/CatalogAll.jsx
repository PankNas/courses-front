import React from 'react';
import styles from './CatalogAll.module.css';
import cn from 'classnames';
import {Link} from "react-router-dom";

const CatalogAll = ({items, title}) => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.catalog}>
        {
          items?.map((item) =>
            <Link key={item._id} to={`${item._id}`}>
              <div className={styles.courseCard}>
                <div >
                  <h4>{item.title}</h4>
                  <div className={styles.tags}>
                    <div className={styles.language} style={{marginRight: "10px"}}>{item.language}</div>
                    <div className={cn(styles.language, styles.levelLanguage)}>{item.levelLanguage}</div>
                  </div>
                </div>
                <img
                  className={styles.img}
                  src={`http://localhost:8000${item.imageUrl}`} alt="img"
                />
              </div>
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default CatalogAll;
