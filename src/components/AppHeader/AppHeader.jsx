import React from "react";
import styles from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationElement from '../NavigationElement/NavigationElement';

function AppHeader() {
  return (
    <header className={`${styles.header} ml-10 mr-10 mt-10 mb-10`}>
      <div className={styles.content}>
        <ul className={styles.navigation}>
        <NavigationElement children={BurgerIcon} type='primary' text='Конструктор'/>
        <NavigationElement children={ListIcon} type='primary' text='Лента заказов'/>
        </ul>
        <Logo />
        <ul className={styles.navigation}>
        <NavigationElement children={ProfileIcon} type='primary' text='Личный кабинет'/>
        </ul>
        
      </div>
      
    </header>
  );
}

export default AppHeader;
