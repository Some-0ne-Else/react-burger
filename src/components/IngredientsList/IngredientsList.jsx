import React from "react";
import styles from './IngredientsList.module.css';
import Ingredient from "../Ingredient/Ingredient";
import BurgerDataContext from '../../contexts/BurgerContext';


function IngredientsList() {
  const data = React.useContext(BurgerDataContext);
  const filterByType = (type) => {
    return data.filter((e) => e.type === type).map((el) => (
      <Ingredient
        key={el._id}
        image={el.image}
        price={el.price}
        name={el.name}
      />
    ))
  }
  return (
    <div className={`${styles.ingredients} pt-6 pl-4 pr-4`}>
      <p className={`${styles.type} text text_type_main-medium`}>
        Булки
      </p>
      <div className={styles.ingredients__container}>
      {filterByType("bun")}
      </div>
      <p className={`${styles.type} text text_type_main-medium`}>
        Соусы
      </p>
      <div className={styles.ingredients__container}>
        {filterByType("sauce")}
      </div>
      <p className={`${styles.type} text text_type_main-medium`}>
        Начинки
      </p>
      <div className={styles.ingredients__container}>
        {filterByType("main")}
      </div>
    </div>
  )
}

export default IngredientsList;