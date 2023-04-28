import React, {useEffect} from 'react';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import axios from "../../../axios";
import {useDispatch, useSelector} from "react-redux";

const PersonCourses = () => {
  const navigate = useNavigate();

  const handleClickAddCourse = async () => {
    try {
      const {data} = await axios.post("/courses", {});

      navigate(`/teach/${data._id}/edit/`);
    } catch (err) {
      console.warn(err);

      alert('Ошибка при создании курса');
    }
  }

  return (
    <>
      <h1>Мои курсы</h1>
      <Button variant="outlined" onClick={handleClickAddCourse}>+ Новый курс</Button>
    </>
  )
};

export default PersonCourses;
