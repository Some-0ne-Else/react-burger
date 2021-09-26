import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Ingredient from '../Ingredient/Ingredient';
import { IIngredientListProps, IIngredient } from '../../types/data';
import { RootState } from '../../types/index';
import styles from './IngredientsList.module.css';

const IngredientsList:FC<IIngredientListProps> = ({ setCurrentTab }) => {
  const ingredients = useSelector((store: RootState) => store.app.ingredients);
  const filterByType = React.useCallback(
    (type:string):IIngredient[] => ingredients.filter((e:IIngredient) => e.type === type),
    [ingredients],
  );
  const buns = React.useMemo(() => filterByType('bun'), [filterByType]);
  const sauce = React.useMemo(() => filterByType('sauce'), [filterByType]);
  const main = React.useMemo(() => filterByType('main'), [filterByType]);
  const bunsRef = React.useRef<HTMLParagraphElement>(null);
  const saucesRef = React.useRef<HTMLParagraphElement>(null);
  const mainsRef = React.useRef<HTMLParagraphElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  /* IQ > 160 Recommended for reading */
  const handleScroll = () => {
    const containerPosition = containerRef.current!.getBoundingClientRect().top;
    const bunsHeaderPosition = bunsRef.current!.getBoundingClientRect().top;
    const sauceHeaderPosition = saucesRef.current!.getBoundingClientRect().top;
    const mainsHeaderPosition = mainsRef.current!.getBoundingClientRect().top;
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
            _id={el._id}
            image={el.image}
            price={el.price}
            name={el.name}
            type={el.type}
            proteins={el.proteins}
            fat={el.proteins}
            carbohydrates={el.carbohydrates}
            calories={el.calories}
            image_mobile={el.image_mobile}
            image_large={el.image_large}
            __v={el.__v}
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
            _id={el._id}
            image={el.image}
            price={el.price}
            name={el.name}
            type={el.type}
            proteins={el.proteins}
            fat={el.proteins}
            carbohydrates={el.carbohydrates}
            calories={el.calories}
            image_mobile={el.image_mobile}
            image_large={el.image_large}
            __v={el.__v}
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
            _id={el._id}
            image={el.image}
            price={el.price}
            name={el.name}
            type={el.type}
            proteins={el.proteins}
            fat={el.proteins}
            carbohydrates={el.carbohydrates}
            calories={el.calories}
            image_mobile={el.image_mobile}
            image_large={el.image_large}
            __v={el.__v}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientsList;
