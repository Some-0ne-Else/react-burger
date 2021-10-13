import React, { FC } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientDetails } from '../../services/actions/appActions';
import { toggleModal } from '../../services/actions/modalActions';
import { RootState, AppDispatch } from '../../types/index';
import { IIngredient, IConstructorIngredient } from '../../types/data';
import styles from './Ingredient.module.css';

const Ingredient:FC<IIngredient> = ({
  _id, image, price, name,
}) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch:AppDispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const { counter } = useSelector(
    (store:RootState) => (
      { counter: store.app.constructorIngredients.filter((el:IConstructorIngredient) => el._id === _id).length }),
  );
  const openModal = (uid:string) => {
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
            pathname: `/ingredients/${_id}`,
            state: { main: location },
          });
          openModal(_id);
        }}
      />
      {counter ? <Counter count={counter} size="default" /> : null }
      <div className={`${styles.price} mb-1`}>
        <p className={` ${styles.price__digits} text text_type_digits-default`}>
          {`${price}`}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  );
};

export default Ingredient;
