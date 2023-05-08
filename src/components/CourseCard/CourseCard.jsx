import React from 'react';
import styles from "./CourseCard.module.scss";
import Button from "@mui/material/Button";

const CourseCard = ({courses}) => {
  return (
    <div className={styles.courses}>
      {
        courses?.map(course =>
          <div key={course._id} className={styles.courseCard}>
            {
              course.imageUrl &&
              <img className={styles.courseImg} src={`http://localhost:8000${course.imageUrl}`} alt="img"/>
            }
            <div className={styles.courseContent}>
              <h3 style={{textAlign: "center"}}>{course.title}</h3>

            </div>
          </div>
        )
      }
    </div>
  )
}
