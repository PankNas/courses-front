import React from 'react';
import styles from './Main.module.css';
import cn from 'classnames';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {Link} from "react-router-dom";
import MySlider from "../../components/Slider/Slider";

const adventures = [
  {
    img: `http://localhost:8000/uploads/books.svg`,
    title: '10+ курсов',
    text: 'Изучай новые языки',
  },
  {
    img: `http://localhost:8000/uploads/man.svg`,
    title: 'Конструктора курсов',
    text: 'Создавай свои образовательные программы',
  },
  {
    img: `http://localhost:8000/uploads/clock.svg`,
    title: 'Доступ круглые сутки',
    text: 'Изучай языки в любимом темпе',
  }
];

const slides = [
  {
    src: '/path/to/image1.jpg',
    title: 'Slide 1 Title',
    description: 'Slide 1 Description',
  },
  {
    src: '/path/to/image2.jpg',
    title: 'Slide 2 Title',
    description: 'Slide 2 Description',
  },
  {
    src: '/path/to/image3.jpg',
    title: 'Slide 3 Title',
    description: 'Slide 3 Description',
  },
];

const Main = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <>
      <div className={styles.main}>
        <div className={cn(styles.container, styles.mainContent)}>
          <div className={styles.welcomeText}>
            <h1 className={styles.title}>Сервис для изучения иностранных языков.</h1>
            <p className={styles.textHeader}>Вступай в команду лингвистов-любителей. Проходи и создавай онлайн-курсы по любимым
              языкам.</p>
            <Link to={isAuth ? '' : '/register'}>
              <button className={styles.buttonJoin}>{isAuth ? "Обучаться" : 'Присоединиться'}</button>
            </Link>
          </div>
        </div>
      </div>

      <div className={cn(styles.container, styles.space, styles.advantages)}>
        {
          adventures.map((elem, index) =>
            <div key={index} className={styles.blockAdvantage}>
              <img className={styles.featureIcon} src={elem.img} alt='' />
              <div className={styles.featureCaption}>
                <h2 className={styles.headerAdvantage}>{elem.title}</h2>
                <p>{elem.text}</p>
              </div>
            </div>
          )
        }
      </div>

      <MySlider slides={slides}/>
    </>
  )
}

export default Main;
