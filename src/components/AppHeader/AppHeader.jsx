import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import NavigationElement from '../NavigationElement/NavigationElement';

function AppHeader() {
  return (
    <header className={`${styles.header}`}>
      <div className={styles.content}>
        <nav className={styles.navigaton}>
          <ul className={styles.navigation__list}>
            <NavigationElement
              component={BurgerIcon}
              type="primary"
              text="Конструктор"
              to="/"
            />
            <NavigationElement
              component={ListIcon}
              type="primary"
              text="Лента заказов"
              to="/feed"
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
              to="/profile"
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
