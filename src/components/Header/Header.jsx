import React from 'react';
import styles from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth, selectRoleUser} from "../../redux/slices/auth";
import cn from "classnames";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../App";
import AvatarUser from "../Avatar/Avatar";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const roleUser = useSelector(selectRoleUser);

  const {data} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Link to={'/'}><img src={`http://localhost:8000/uploads/my/logo.png`} alt="logo"/></Link>
        <nav>
          <ul className={styles.navMenu}>
            {
              isAuth &&
              <>
                <li><Link className={styles.navLink} to={'/catalog'}>Каталог</Link></li>
                <li><Link className={styles.navLink} to={'/study'}>Обучение</Link></li>
                <li><Link className={styles.navLink} to={'/teach'}>Преподавание</Link></li>
              </>
            }
            {
              roleUser === 'moderator' &&
              <>
                <li><Link className={styles.navLink} to={'moderate'}>Модерация</Link></li>
                {/*<li><Link className={styles.navLink} to={'check'}>Проверки</Link></li>*/}
              </>
            }
            {
              roleUser === 'adm' &&
              <li><Link className={styles.navLink} to={'adm'}>Админ</Link></li>
            }

            {/*<li><Link className={styles.navLink} to={isAuth ? '' : '/login'}>Каталог</Link></li>*/}
            {/*<li><a className={styles.navLink} href="#">О нас</a></li>*/}
            {
              isAuth ?
                <>
                  <li>
                    <AvatarUser />
                  </li>
                  {/*<li>*/}
                  {/*  <button*/}
                  {/*    className={cn(styles.buttonHeader, styles.signIn)}*/}
                  {/*    onClick={handleLogOut}*/}
                  {/*  >*/}
                  {/*    Выход*/}
                  {/*  </button>*/}
                  {/*</li>*/}
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
