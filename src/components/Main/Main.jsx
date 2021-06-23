import React from 'react';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './Main.module.css';

function Main(){
    return(
        <main className={styles.main}>
        <BurgerIngredients/>
        </main>
        )
}

export default Main;