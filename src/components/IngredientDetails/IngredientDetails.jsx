import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, getIngredientDetails } from '../../services/actions';
import styles from './IngredientDetails.module.css';

function IngredientDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentIngredient = useSelector((store) => store.app.currentIngredient);

  React.useEffect(() => {
    dispatch(fetchIngredients())
      .then(() => dispatch(getIngredientDetails(id)));
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
}
export default IngredientDetails;
