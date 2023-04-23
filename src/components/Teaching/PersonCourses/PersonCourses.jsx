import React from 'react';
import Button from "@mui/material/Button";
import {Link, Navigate} from "react-router-dom";

const PersonCourses = () => {
  return (
    <>
      <h1>Мои курсы</h1>
      <Link to='/teach/new'>
        <Button variant="outlined">+ Новый курс</Button>
      </Link>
    </>
  )
};

export default PersonCourses;
