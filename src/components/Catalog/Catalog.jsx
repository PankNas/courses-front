import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCourses} from "../../redux/slices/courses";
import styles from "./Catalog.module.scss";
import {Link} from "react-router-dom";

const Catalog = ({title, items}) => {
  return (
    <div style={{margin: '30px'}}>
      <h1>{title}</h1>
      <div className={styles.courses}>
        {
          items?.map(course =>
            <Link to={`${course._id}`}>
              <div key={course._id} className={styles.courseCard}>
                {
                  course.imageUrl &&
                  <img className={styles.courseImg} src={`http://localhost:8000${course.imageUrl}`} alt="img"/>
                }
                <div className={styles.courseContent}>
                  <h3 style={{textAlign: "center"}}>{course.title}</h3>
                </div>
              </div>
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Catalog;
