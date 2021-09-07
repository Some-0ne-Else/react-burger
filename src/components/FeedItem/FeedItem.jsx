import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { toggleModal } from '../../services/actions/modalActions';
import { prepareDate } from '../../utils/utils';
import { INGREDIENTS_TO_SHOW } from '../../utils/constants';
import styles from './FeedItem.module.css';

function FeedItem({
  id, createdAt, number, name, ingredients,
}) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const ingredientsList = useSelector((store) => store.app.ingredients);
  const renderedIngredients = ingredients?.map(
    (orderIngredientId) => ingredientsList.find((ingredient) => ingredient._id === orderIngredientId),
  );
  const total = renderedIngredients?.reduce((acc, ingredient) => acc + ingredient.price, 0);
  const openModal = () => {
    dispatch(toggleModal());
  };
  return (
    <div
      className={`${styles.feed_item} mb-4`}
      onClick={() => {
        history.replace({
          pathname: `/feed/${id}`,
          state: { main: location },
        });
        openModal(id);
      }}
    >
      <div className={`${styles.number_wrapper} mt-6`}>
        <p className="text text_type_digits-default ml-6">{`#${number}`}</p>
        <p className="text text_type_main-default text_color_inactive mr-6">{prepareDate(createdAt)}</p>
      </div>
      <p className="text text_type_main-medium mt-6 ml-6">{name}</p>
      <div className={`${styles.components} mt-6 mr-6 ml-6 mb-6`}>
        <div className={styles.components_wrapper}>
          {renderedIngredients.slice(0, INGREDIENTS_TO_SHOW).map((ingredient, index) => (
            <div
              key={index.toString()}
              className={styles.image_container}
              style={{
                transform: `translateX(${-20 * index}px)`,
                zIndex: `${100 - index}`,
              }}
            >
              {renderedIngredients.length > INGREDIENTS_TO_SHOW && index === 5
                ? (
                  <>
                    <img className={`${styles.image} ${styles.image_shadowed}`} src={ingredient.image} alt={ingredient.name} />
                    <p className={`${styles.digits} text text_type_main-default`}>
                      {`+${renderedIngredients.length - INGREDIENTS_TO_SHOW}`}
                    </p>
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
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
export default FeedItem;
