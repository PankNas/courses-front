import React from 'react';
import styles from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";
import cn from "classnames";
import {Link} from "react-router-dom";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const {data} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Link to={'/'}><img src={`http://localhost:8000/uploads/logo.png`} alt="logo"/></Link>
        <nav>
          <ul className={styles.navMenu}>
            <li><a className={styles.navLink} href="#">Главная</a></li>
            <li><a className={styles.navLink} href="#">Курсы</a></li>
            <li><a className={styles.navLink} href="#">О нас</a></li>
            <li><a className={styles.navLink} href="#">Контакты</a></li>
            {
              isAuth ?
                <>
                  <Link to={''}>
                    <div className={styles.imgUser}>
                      {
                        data.avatarUrl === '' ?
                          <p className={styles.imgUserName}>data.fullName[0].toUpperCase()</p> :
                          <img src={`http://localhost:8000${data.avatarUrl}`} alt="U"/>
                      }
                    </div>
                  </Link>
                  <li>
                    <button
                      className={cn(styles.buttonHeader, styles.signIn)}
                      onClick={handleLogOut}
                    >
                      Выход
                    </button>
                  </li>
                </>
                :
                <>
                  <Link to={'/login'} className={styles.styleNavLink}>
                    <li>
                      <button className={cn(styles.buttonHeader, styles.signIn)}>Войти</button>
                    </li>
                  </Link>
                  <Link to={'/register'} className={styles.styleNavLink}>
                    <li>
                      <button className={cn(styles.buttonHeader, styles.reg)}>Регистрация</button>
                    </li>
                  </Link>
                </>
            }
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
