import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import NavigationElement from '../NavigationElement/NavigationElement';

function AppHeader() {
  const history = useHistory();
  const handleConstructor = () => {
    history.push({ pathname: '/' });
  };
  const handleList = () => {
    console.log('List order');
  };
  const handlePersonalArea = () => {
    history.push({ pathname: '/profile' });
  };

  return (
    <header className={`${styles.header}`}>
      <div className={styles.content}>
        <nav className={styles.navigaton}>
          <ul className={styles.navigation__list}>
            <NavigationElement
              component={BurgerIcon}
              type="primary"
              text="Конструктор"
              onClick={handleConstructor}
            />
            <NavigationElement
              component={ListIcon}
              type="primary"
              text="Лента заказов"
              onClick={handleList}
            />
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>
        <nav className={styles.navigaton}>
          <ul className={styles.navigation}>
            <NavigationElement
              component={ProfileIcon}
              type="primary"
              text="Личный кабинет"
              onClick={handlePersonalArea}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
