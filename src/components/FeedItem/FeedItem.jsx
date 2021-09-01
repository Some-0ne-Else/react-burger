import React from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './FeedItem.module.css';
import { prepareDate } from '../../utils/utils';

function FeedItem({
  createdAt, number, name, ingredients,
}) {
  const ingredientsList = useSelector((store) => store.app.ingredients);
  const renderedIngredients = ingredients?.map((item) => ingredientsList.find((ingredient) => ingredient._id === item));
  const total = renderedIngredients?.reduce((acc, ingredient) => acc + ingredient.price, 0);
  console.log(renderedIngredients);
  return (
    <div className={`${styles.feed_item} mb-4`}>
      <div className={`${styles.number_wrapper} mt-6`}>
        <p className="text text_type_digits-default ml-6">{`#${number}`}</p>
        <p className="text text_type_main-default text_color_inactive mr-6">{prepareDate(createdAt)}</p>
      </div>
      <p className="text text_type_main-medium mt-6 ml-6">{name}</p>
      <div className={`${styles.components} mt-6 mr-6 ml-6 mb-6`}>
        <div className={styles.components_wrapper}>
          {renderedIngredients.slice(0, 6).map((ingredient, index) => (
            <div
              key={index.toString()}
              className={styles.image_container}
              style={{
                transform: `translateX(${-20 * index}px)`,
                zIndex: `${100 - index}`,
              }}
            >
              {renderedIngredients.length > 6 && index === 5
                ? (
                  <>
                    <img className={`${styles.image} ${styles.image_shadowed}`} src={ingredient.image} alt={ingredient.name} />
                    <p className={`${styles.digits} text text_type_main-default`}>+3</p>
                  </>
                )
                : (
                  <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
                )}

            </div>
          ))}
        </div>
        <div className={`${styles.total_wrapper} ml-6`}>
          <p className="text text_type_digits-default mr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
FeedItem.propTypes = {
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
export default FeedItem;
