import React, {useEffect, useState} from 'react';
import styles from './Adm.module.css';
import axios from "../../axios";
import {dividerClasses} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectRoleUser} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import cn from 'classnames';

const Adm = () => {
  const isAuth = useSelector(selectIsAuth);
  const userRole = useSelector(selectRoleUser);
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => (await axios.get('/users')).data;

    getUsers()
      .then(res => {
        let arr = []

        let filter = res.filter(elem => elem.role === 'adm');
        arr.push(filter);

        filter = res.filter(elem => elem.role === 'moderator');
        arr.push(filter);

        filter = res.filter(elem => elem.role === 'member');
        arr.push(filter);

        // const sample = [{adm: 1}, {moderator: 2}, {member: 3}];
        //
        // const sortRes = res.slice().sort((a, b) => sample[a.role] - sample[b.role]);
        // console.log(sortRes);

        setUsers(arr);
      });
  }, [isChange]);

  if (!isAuth || userRole !== 'adm') {
    return <Navigate to={'/'}/>;
  }

  const handleMakeModerator = async (event, id, index) => {
    try {
      await axios.patch(`/users/${id}`, {role: 'moderator'});

      users[index].role = 'moderator';
      setUsers(users);
      alert('Вы добавили модератора');
      setIsChange(prev => !prev);
    } catch (e) {
      console.log(e);
      alert('Не удалось добавить модератора');
    }
  };

  const handleDelModerator = async (event, id, index) => {
    try {
      await axios.patch(`/users/${id}`, {role: 'member', reviewCourses: []});

      // users[index].role = 'member';
      // users[index].reviewCourses = 'member';

      // setUsers(users);
      alert('Вы удалили модератора');
      setIsChange(prev => !prev);
    } catch (e) {
      console.log(e);
      alert('Не удалось удалить модератора');
    }
  };

  const handleRemoveUser = async (event, id, index) => {
    try {
      await axios.delete(`/users/${id}`);

      // users[index].role = 'member';
      // users[index].reviewCourses = 'member';

      setUsers(users);
      setIsChange(prev => !prev);
      alert('Вы удалили пользователя');
    } catch (e) {
      console.log(e);
      alert('Не удалось удалить пользователя');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Пользователи системы</h1>

      <div >
        {
          users?.map((roles, i) => {
              let title;

              if (i === 0)
                title = 'Администратор';
              else if (i === 1)
                title = 'Модераторы';
              else title = 'Пользователи';

              return <div>
                <h3>{title}</h3>
                <div className={styles.users}>
                  {
                    roles.map((elem, index) =>
                      <div key={elem._id} className={styles.userCard}>
                        <div className={styles.userInfo}>
                          {
                            !elem.avatarUrl ?
                              <Avatar
                                style={{backgroundColor: '#FF9F67'}}
                                sx={{width: 56, height: 56}}
                              >
                                {elem.fullName[0].toUpperCase()}
                              </Avatar> :
                              <Avatar
                                sx={{width: 56, height: 56}}
                                src={`http://localhost:8000${elem.avatarUrl}`}
                              />
                          }
                          <div style={{marginLeft: '20px'}}>
                            <p>Имя: {elem.fullName}</p>
                            <p>Почта: {elem.email}</p>
                          </div>
                        </div>
                        <div className={styles.buttonsBlock}>
                          {
                            elem.role !== 'moderator' && elem.role !== 'adm' &&
                            <button
                              className={styles.button}
                              onClick={(event) => handleMakeModerator(event, elem._id, index)}
                            >
                              Сделать модератором
                            </button>
                          }
                          {
                            elem.role === 'moderator' &&
                            <button
                              className={styles.button}
                              onClick={(event) => handleDelModerator(event, elem._id, index)}
                            >
                              Удалить модератора
                            </button>
                          }
                          {
                            elem.role !== 'adm' &&
                            <button
                              className={cn(styles.button, styles.btnRemove)}
                              onClick={(event) => handleRemoveUser(event, elem._id, index)}
                            >
                              Удалить
                            </button>
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>;
            }
          )
        }
      </div>
    </div>
  );
};

export default Adm;
