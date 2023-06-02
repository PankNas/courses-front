import React, {useEffect, useState} from 'react';
import styles from './Main.module.css';
import cn from 'classnames';
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentCourses, selectIsAuth} from "../../redux/slices/auth";
import {Link, Navigate} from "react-router-dom";
import MySlider from "../../components/Slider/Slider";
import Avatar from "@mui/material/Avatar";
import {setLevel} from "../../components/Catalogs/CatalogAll";
import {fetchCourses} from "../../redux/slices/courses";

const adventures = [
  {
    img: `http://localhost:8000/uploads/my/books.svg`,
    title: '10+ курсов',
    text: 'Изучай новые языки',
  },
  {
    img: `http://localhost:8000/uploads/my/man.svg`,
    title: 'Удобный конструктор',
    text: 'Создавай свои курсы',
  },
  {
    img: `http://localhost:8000/uploads/my/clock.svg`,
    title: 'Круглосуточно',
    text: 'Изучай языки в любимом темпе',
  }
];

const slides = [
  {
    src: 'http://localhost:8000/uploads/flags/england-flag.png',
    title: 'Английский',
  },
  {
    src: 'http://localhost:8000/uploads/flags/gernamy-flag.png',
    title: 'Немецкий',
  },
  {
    src: 'http://localhost:8000/uploads/flags/spain-flag.jpg',
    title: 'Испанский',
  },
  {
    src: 'http://localhost:8000/uploads/flags/france-flag.jpg',
    title: 'Французский',
  },
  {
    src: 'http://localhost:8000/uploads/flags/chexia.png',
    title: 'Чешский',
  },
  {
    src: 'http://localhost:8000/uploads/flags/england-flag.png',
    title: 'Английский',
  },
];

const Main = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.courses);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchCourses());

    setCourses(items?.filter(item => item.status === 'active'))
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={cn(styles.container, styles.mainContent)}>
          <div className={styles.welcomeText}>
            <h1 className={styles.title}>Сервис для изучения иностранных языков</h1>
            <p className={styles.textHeader}>Вступай в команду лингвистов-любителей. Проходи и создавай онлайн-курсы по
              любимым
              языкам.</p>
            <Link to={isAuth ? '/catalog' : '/login'}>
              <button className={styles.buttonJoin}>{isAuth ? "Обучаться" : 'Присоединиться'}</button>
            </Link>
          </div>
        </div>
      </div>

      <div className={cn(styles.container, styles.space, styles.advantages)}>
        {
          adventures.map((elem, index) =>
            <div key={index} className={styles.blockAdvantage}>
              <img className={styles.featureIcon} src={elem.img} alt=""/>
              <div className={styles.featureCaption}>
                <h2 className={styles.headerAdvantage}>{elem.title}</h2>
                <p>{elem.text}</p>
              </div>
            </div>
          )
        }
      </div>

      <section className={cn(styles.container, styles.space)}>
        <h2 className={styles.headerLanguages}>Языковые направления</h2>
        <MySlider slides={slides}/>
      </section>

      <section className={cn(styles.container, styles.info, styles.space)}>
        <img src={`http://localhost:8000/uploads/my/info.png`} alt="img" className={styles.infoImg}/>
        <div className={styles.infoText}>
          <h2 className={styles.headerInfo}>У нас ты сможешь...</h2>
          <ul className={styles.infoList}>
            <li className={styles.infoListItem}>Улучшить свои навыки владения языками.</li>
            <li className={styles.infoListItem}>Интересно и познавательно проводить досуг.</li>
            <li className={styles.infoListItem}>Не только проходить курсы, но и создавать свои собственные.</li>
          </ul>
        </div>
      </section>

      <section className={cn(styles.container, styles.space)}>
        <h2 className={styles.headerCourses}>Подборка наших курсов</h2>
        <div className={styles.blockCourses}>
          {
            items?.filter(item => item.status === 'active')?.map((item) => {
              const level = setLevel(item.levelLanguage);

              return <Link key={item._id} to={isAuth ? `/catalog/${item._id}` : '/login'}>
                <div className={styles.courseCard}>
                  <div className={styles.cartContent}>
                    <h4>{item.title}</h4>
                    {/*<p>Автор: {item.user.fullName}</p>*/}
                    <div className={styles.tags}>
                      <div className={styles.language}>{item.language}</div>
                      <div className={cn(styles.language, styles[level])}>{item.levelLanguage}</div>
                    </div>
                  </div>
                  <img
                    className={styles.img}
                    src={`http://localhost:8000${item.imageUrl}`} alt="img"
                  />
                </div>
              </Link>;
            })
          }
        </div>
        <Link to={isAuth ? '/catalog' : '/login'}>
          <button className={styles.buttonCourses}>Узнать больше</button>
        </Link>
      </section>

      <section className={cn(styles.container, styles.invite, styles.space)}>
        <div className={styles.infoText}>
          <h2 className={styles.headerInfo}>Достигай своих целей вместе с нами.</h2>
          <p className={styles.inviteText}>
            {
              isAuth ?
                'О, так ты уже в команде? Тогда не пора ли продолжить обучение' :
                'Еще не с нами? Скорее присоединяйся, чтобы вместе грызть гранит науки.'
            }
          </p>
          <Link to={isAuth ? '/catalog' : '/login'}>
            <button className={styles.buttonJoin}>{isAuth ? "Обучаться" : 'Присоединиться'}</button>
          </Link>
        </div>
        <img src={`http://localhost:8000/uploads/my/about2.png`} className={styles.infoImg} alt="img"/>
      </section>
    </>
  );
};

export default Main;
