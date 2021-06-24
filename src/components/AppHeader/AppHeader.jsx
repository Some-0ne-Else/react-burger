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
  const handleConstructor = () =>{
    console.log('constructor');
  }
  const handleList = () =>{
    console.log('List order');
  }
  const handlePersonalArea = () =>{
    console.log('Personal Area');
  }
  
  return (
    <header className={`${styles.header} ml-10 mr-10 mt-10 mb-10`}>
      <div className={styles.content}>
      <nav className={styles.navigaton}>
        <ul className={styles.navigation__list}>
        <NavigationElement component={BurgerIcon} type='primary' text='Конструктор' onClick={handleConstructor}/>
        <NavigationElement component={ListIcon} type='primary' text='Лента заказов' onClick={handleList}/>
        </ul>
        </nav>
        <Logo />
        <nav className={styles.navigaton}>
        <ul className={styles.navigation}>
        <NavigationElement component={ProfileIcon} type='primary' text='Личный кабинет' onClick={handlePersonalArea}/>
        </ul>
        </nav>
      </div>
      
    </header>
  );
}

export default AppHeader;
