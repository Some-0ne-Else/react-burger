import React, { FC } from 'react';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './Main.module.css';

const Main:FC = () => (
  <main className={styles.main}>
    <BurgerIngredients />
    <BurgerConstructor />
  </main>
);

export default Main;
