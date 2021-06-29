import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientsList.module.css';
import Ingredient from "../Ingredient/Ingredient";
import BurgerDataContext from '../../contexts/BurgerContext';

function IngredientsList({ openModal }) {
  const data = React.useContext(BurgerDataContext);
  const filterByType = React.useCallback( (type) => {
    return data.filter((e) => e.type === type)
  },[data])
  const buns = React.useMemo(() => filterByType('buns'), [filterByType]);
  const sauce = React.useMemo(() => filterByType('sauce'), [filterByType]);
  const main = React.useMemo(() => filterByType('main'), [filterByType]);
  return (
    <div className={`${styles.ingredients} pt-6 pl-4 pr-4`}>
      <p id="buns" className={`${styles.type} text text_type_main-medium`}>
       Булки
      </p>
      <div className={styles.ingredients__container}>
      {buns.map((el) => (
      <Ingredient
        key={el._id}
        id={el._id}
        image={el.image}
        price={el.price}
        name={el.name}
        openModal={openModal}
      />
    ))}
      </div>
      <p id="sauces" className={`${styles.type} text text_type_main-medium`}>
      Соусы
      </p>
      <div className={styles.ingredients__container}>
      {sauce.map((el) => (
      <Ingredient
        key={el._id}
        id={el._id}
        image={el.image}
        price={el.price}
        name={el.name}
        openModal={openModal}
      />
    ))}
      </div>
      <p id="mains" className={`${styles.type} text text_type_main-medium`}>
       Начинки
      </p>
      <div className={styles.ingredients__container}>
      {main.map((el) => (
      <Ingredient
        key={el._id}
        id={el._id}
        image={el.image}
        price={el.price}
        name={el.name}
        openModal={openModal}
      />
    ))}
      </div>
    </div>
  )
}

export default IngredientsList;

IngredientsList.propTypes = {
  openModal: PropTypes.func.isRequired,
}