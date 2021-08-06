import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientDetails, toggleModal } from '../../services/actions/index';
import styles from './Ingredient.module.css';

function Ingredient({
  id, image, price, name,
}) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const { counter } = useSelector(
    (store) => ({ counter: store.constructorIngredients.filter((el) => el._id === id).length }),
  );
  const openModal = (uid) => {
    dispatch(getIngredientDetails(uid));
    dispatch(toggleModal());
  };
  return (
    <div ref={dragRef} className={`${styles.ingredient} mb-10 ${isDrag && styles.ingredient_dragging}`}>
      <img
        src={image}
        alt={name}
        className={`${styles.image} ml-4 mr-4 mb-1`}
        onClick={() => {
          history.replace({
            pathname: `/ingredients/${id}`,
            state: { main: location },
          });
          openModal(id);
        }}
      />
      {counter ? <Counter count={counter} size="default" /> : null}
      <div className={`${styles.price} mb-1`}>
        <p className={` ${styles.price__digits} text text_type_digits-default`}>
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  );
}

export default Ingredient;

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
