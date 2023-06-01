import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {IconButton} from "@mui/material";
import {pathFolder} from "../../App";
import styles from "../Courses/Course/Course.module.scss";
import axios from "../../axios";
import {useParams} from "react-router-dom";

const Score = () => {
  const {courseId} = useParams();
  const {data} = useSelector(state => state.auth);

  let [curScore, setCurScore] = useState({score: 0});
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    const getCourse = async () => (await axios.get(`/courses/${courseId}`)).data;

    getCourse()
      .then(res => {
        let scoreUser = res.scores.find(elem => elem.user === data?._id) || {score: 0};

        setCurScore(scoreUser);
      });
  }, [isChange]);

  const handleClickStar = async (event) => {
    try {
      await axios.patch(`/score/${courseId}`, {
        score: +event.target.id + 1,
      });

      // setIsUpdate(prev => !prev);
      setIsChange(prev => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {
        new Array(5).fill('').map((_, index) =>
          <IconButton key={index} onClick={handleClickStar}>
            <img
              id={`${index}`}
              src={curScore?.score < index + 1 ? `${pathFolder}/my/star.svg` : `${pathFolder}/my/star_fill.svg`}
              alt="star"
              className={styles.starImg}
            />
          </IconButton>
        )
      }
    </>
  );
};

export default Score;
