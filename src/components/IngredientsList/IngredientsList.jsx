import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './IngredientsList.module.css';
import Ingredient from '../Ingredient/Ingredient';

function IngredientsList({ setCurrentTab }) {
  const ingredients = useSelector((store) => store.ingredients);
  const filterByType = React.useCallback(
    (type) => ingredients.filter((e) => e.type === type),
    [ingredients],
  );
  const buns = React.useMemo(() => filterByType('bun'), [filterByType]);
  const sauce = React.useMemo(() => filterByType('sauce'), [filterByType]);
  const main = React.useMemo(() => filterByType('main'), [filterByType]);
  const bunsRef = React.useRef(null);
  const saucesRef = React.useRef(null);
  const mainsRef = React.useRef(null);
  const containerRef = React.useRef(null);

  /* IQ > 160 Recommended for reading */
  const handleScroll = () => {
    const containerPosition = containerRef.current.getBoundingClientRect().top;
    const bunsHeaderPosition = bunsRef.current.getBoundingClientRect().top;
    const sauceHeaderPosition = saucesRef.current.getBoundingClientRect().top;
    const mainsHeaderPosition = mainsRef.current.getBoundingClientRect().top;
    const bunsDiff = Math.abs(containerPosition - bunsHeaderPosition);
    const sauceDiff = Math.abs(containerPosition - sauceHeaderPosition);
    const mainsDiff = Math.abs(containerPosition - mainsHeaderPosition);

    switch (true) {
      case (bunsDiff < sauceDiff) && (bunsDiff < mainsDiff): {
        setCurrentTab('buns'); break;
      }
      case (sauceDiff < bunsDiff) && (sauceDiff < mainsDiff): {
        setCurrentTab('sauces'); break;
      }
      default: {
        setCurrentTab('mains');
      }
    }
  };

  return (
    <div ref={containerRef} onScroll={handleScroll} className={`${styles.ingredients} pt-6 pl-4 pr-4`}>
      <p id="buns" ref={bunsRef} className={`${styles.type} text text_type_main-medium`}>
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
          />
        ))}
      </div>
      <p id="sauces" ref={saucesRef} className={`${styles.type} text text_type_main-medium`}>
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
          />
        ))}
      </div>
      <p id="mains" ref={mainsRef} className={`${styles.type} text text_type_main-medium`}>
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
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientsList;

IngredientsList.propTypes = {
  setCurrentTab: PropTypes.func.isRequired,
};
