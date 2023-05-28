import React from 'react';

import styles from './Menu.module.css';

import Search from "../Search/Search";
import Logo from "../Logo/Logo";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/slices/auth";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logout());

    navigate('/login');
  }

  return (
    <div className={styles.menu}>
      <Logo />
      <Search />
      <Button
        variant={'outlined'}
        size={'large'}
        onClick={handleClickLogout}
        style={{marginTop: "15px"}}
      >
        Выйти
      </Button>
    </div>
  )
};

export default Menu;
