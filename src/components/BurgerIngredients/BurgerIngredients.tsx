import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import IngredientsList from '../IngredientsList/IngredientsList';

const BurgerIngredients:FC = () => {
  const [currentTab, setCurrentTab] = React.useState<string>('buns');
  const setTab = (tab:string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`${styles.burger__block} mr-10`}>
      <p
        className={`${styles.burger__title}text text_type_main-large mt-10 mb-5`}
      >
        Соберите бургер
      </p>
      <div className={`${styles.burger__switch} mb-10`}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === 'mains'} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <IngredientsList setCurrentTab={setCurrentTab} />
    </section>
  );
};

export default BurgerIngredients;
