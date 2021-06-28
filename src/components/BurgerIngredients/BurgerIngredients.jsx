import React from "react";
import styles from './BurgerIngredients.module.css';
import {
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from '../IngredientsList/IngredientsList';

function BurgerIngredients({ openModal }) {
  const [current, setCurrent] = React.useState('one')
  return (
    <section className={`${styles.burger__block} mr-10`}>
      <p className={`${styles.burger__title}text text_type_main-large mt-10 mb-5`}>Соберите бургер</p>
      <div className={`${styles.burger__switch} mb-10`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
 <IngredientsList openModal={openModal}/>

    </section>
  )
}

export default BurgerIngredients;