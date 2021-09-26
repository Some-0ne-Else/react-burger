import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import NavigationElement from '../NavigationElement/NavigationElement';

const AppHeader:FC = () => (
  <header className={`${styles.header}`}>
    <div className={styles.content}>
      <nav className={styles.navigaton}>
        <ul className={styles.navigation__list}>
          <NavigationElement
            component={BurgerIcon}
            type="primary"
            text="Конструктор"
            to="/"
            exact
          />
          <NavigationElement
            component={ListIcon}
            type="primary"
            text="Лента заказов"
            to="/feed"
          />
        </ul>
      </nav>
      <Link to={{ pathname: '/' }} className={styles.logo}>
        <Logo />
      </Link>
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

export default AppHeader;
