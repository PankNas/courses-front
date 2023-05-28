import React, {useEffect, useState} from 'react';
import styles from './Catalogs.module.css';
import cn from 'classnames';
import {Link} from "react-router-dom";
import Search from "../Search/Search";

const CatalogAll = ({items, title}) => {
  const [courses, setCourses] = useState(items);

  // const handleSearch = () => {
  //   let search = items.filter(item => item.title.includes(input));
  //
  //   if (language.language !== '') {
  //     search = search.filter(item => item.language === language.language);
  //   }
  //
  //   if (language.level !== '') {
  //     search = search.filter(item => item.levelLanguage === language.level);
  //   }
  //
  //   setCourses(search);
  // }

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      <Search
        items={items}
        setCourses={setCourses}
        // input={input}
        // language={language}
        // fnInput={handleInput}
        // fnChangeLanguage={handleChangeLanguage}
        // fnSearch={handleSearch}
      />
      <div className={styles.catalog}>
        {
          courses?.map((item) =>
            <Link key={item._id} to={`${item._id}`} className={styles.link}>
              <div className={styles.courseCard}>
                <div className={styles.cartContent}>
                  <h4>{item.title}</h4>
                  {/*<p>Автор: {item.user.fullName}</p>*/}
                  <div className={styles.tags}>
                    <div className={styles.language} >{item.language}</div>
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
