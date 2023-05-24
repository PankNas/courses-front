import React, {useEffect, useState} from 'react';
import styles from './Adm.module.css';
import axios from "../../axios";
import {dividerClasses} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectRoleUser} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";

const Adm = () => {
  const isAuth = useSelector(selectIsAuth);
  const userRole = useSelector(selectRoleUser);
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => (await axios.get('/users')).data;

    getUsers()
      .then(res => {
        setUsers(res);
      });
  }, []);

  if (!isAuth || userRole !== 'adm') {
    return <Navigate to={'/'}/>
  }

  const handleMakeModerator = async (event, id, index) => {
    try {
      await axios.patch(`/users/${id}`, {role: 'moderator'})

      users[index].role = 'moderator';
      setUsers(users);
      alert('Вы добавили модератора')
    } catch (e) {
      console.log(e);
      alert('Не удалось добавить модератора')
    }
  }

  const handleDelModerator = async (event, id, index) => {
    try {
      await axios.patch(`/users/${id}`, {role: 'member', reviewCourses: []})

      users[index].role = 'member';
      // users[index].reviewCourses = 'member';

      setUsers(users);
      alert('Вы удалили модератора')
    } catch (e) {
      console.log(e);
      alert('Не удалось удалить модератора')
    }
  }

  const handleRemoveUser = async (event, id, index) => {
    try {
      await axios.patch(`/users/${id}`, {role: 'member', reviewCourses: []})

      users[index].role = 'member';
      // users[index].reviewCourses = 'member';

      setUsers(users);
      alert('Вы удалили модератора')
    } catch (e) {
      console.log(e);
      alert('Не удалось удалить модератора')
    }
  }

  return (
    <div className={styles.container}>
      {
        users?.map((elem, index) =>
          <div key={elem._id} className={styles.userCard}>
            <div>
              <p>Имя: {elem.fullName}</p>
              <p>Почта: {elem.email}</p>
              <p>Статус: {elem.status}</p>
            </div>
            <div className={styles.buttonsBlock}>
              {
                elem.status !== 'moderator' && elem.status !== 'adm' &&
                <button
                  className={styles.button}
                  onClick={(event) => handleMakeModerator(event, elem._id, index)}
                >
                  Сделать модератором
                </button>
              }
              {
                elem.status === 'moderator' &&
                <button
                  className={styles.button}
                  onClick={(event) => handleDelModerator(event, elem._id, index)}
                >
                  Удалить из модераторов
                </button>
              }
              <button
                className={styles.btnRemove}
                onClick={(event) => handleRemoveUser(event, elem._id, index)}
              >
                <div className={styles.removeButton}/>
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Adm;
