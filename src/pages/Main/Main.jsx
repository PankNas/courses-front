import React, {useEffect} from 'react';
import styles from './Main.module.css';
import cn from 'classnames';
import {useDispatch, useSelector} from "react-redux";
import {fetchStudentCourses, selectIsAuth} from "../../redux/slices/auth";
import {Link, Navigate} from "react-router-dom";
import MySlider from "../../components/Slider/Slider";
import Avatar from "@mui/material/Avatar";

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
  const courses = useSelector(state => state.auth.studentCourses);

  useEffect(() => {
    dispatch(fetchStudentCourses());
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
            courses?.map(course =>
              <Link key={course._id} to={isAuth ? `/catalog/${course._id}` : '/login'}>
                <div className={styles.courseItem}>
                  <div className={styles.textCourse}>
                    <h3 className={styles.headerCourse}>{course.title}</h3>
                    <p className={styles.courseText}>Автор: {course.fullName}</p>
                  </div>
                  <div className={styles.blockImg}>
                    {/*<div className={styles.circle}>*/}
                    {
                      !course.avatarUrl ?
                        <Avatar
                          style={{backgroundColor: '#FF9F67'}}
                          sx={{width: 56, height: 56}}
                        >
                          {course.fullName[0].toUpperCase()}
                        </Avatar> :
                        <Avatar
                          sx={{width: 56, height: 56}}
                          src={`http://localhost:8000${course.avatarUrl}`}
                        />
                    }
                    {/*</div>*/}
                  </div>
                </div>
              </Link>
            )
          }

          <div className={styles.courseItem}>
            <div className={styles.textCourse}>
              <h3 className={styles.headerCourse}><a href="#">Какое-то название курса</a></h3>
              <p className={styles.courseText}>Автор</p>
              {/*<div className="rating">*/}
              {/*  <span className="num-rating"><b>0</b></span>*/}
              {/*  <div className="stars">*/}
              {/*    <span className="star material-symbols-outlined">star</span>*/}
              {/*    <span className="star material-symbols-outlined">star</span>*/}
              {/*    <span className="star material-symbols-outlined">star</span>*/}
              {/*    <span className="star material-symbols-outlined">star</span>*/}
              {/*    <span className="star material-symbols-outlined">star</span>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
            <div className={styles.blockImg}>
              <div className="circle">
                <img src={`http://localhost:8000/uploads/my/feature3.png`} className={styles.img} alt="img-course"/>
              </div>
            </div>
          </div>
          <div className={styles.courseItem}></div>
          <div className={styles.courseItem}></div>
          <div className={styles.courseItem}></div>
          <div className={styles.courseItem}></div>
          <div className={styles.courseItem}></div>
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
