import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAndGetIngredientDetails } from '../../services/actions/appActions';
import { RootState, AppDispatch } from '../../types/index';
import { IIngredient } from '../../types/data';
import styles from './IngredientDetails.module.css';

const IngredientDetails:FC = () => {
  const { id } = useParams<{id: string}>();
  const dispatch:AppDispatch = useDispatch();
  const currentIngredient:IIngredient = useSelector((store: RootState) => store.app.currentIngredient);

  React.useEffect(() => {
    dispatch(fetchAllAndGetIngredientDetails(id));
  }, []);

  return (
    <div className={styles.ingredientdetails}>
      <img
        src={currentIngredient.image}
        alt={currentIngredient.name}
        className={`${styles.ingredientdetails__image} mb-4`}
      />
      <p
        className={`${styles.ingredientdetails__name} mb-8 text text_type_main-medium`}
      >
        {currentIngredient.name}
      </p>
      <div className={`${styles.ingredientdetails__details} mb-15`}>
        <div className={`${styles.ingredientdetails__desc} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p
            className={`${styles.ingredientdetails__value} text text_type_digits-default text_color_inactive`}
          >
            {currentIngredient.calories}
          </p>
        </div>
        <div className={`${styles.ingredientdetails__desc} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p
            className={`${styles.ingredientdetails__value} text text_type_digits-default text_color_inactive`}
          >
            {currentIngredient.proteins}
          </p>
        </div>
        <div className={`${styles.ingredientdetails__desc} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p
            className={`${styles.ingredientdetails__value} text text_type_digits-default text_color_inactive`}
          >
            {currentIngredient.fat}
          </p>
        </div>
        <div className={`${styles.ingredientdetails__desc}`}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p
            className={`${styles.ingredientdetails__value} text text_type_digits-default text_color_inactive`}
          >
            {currentIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};
export default IngredientDetails;
