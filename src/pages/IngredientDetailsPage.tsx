import React, { FC } from 'react';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import styles from './IngredientDetailsPage.module.css';

const IngredientDetailsPage:FC = () => (
  <>
    <div className={styles.wrapper}>
      <p className="text text_type_main-large">
        Детали ингредиента
      </p>
      <IngredientDetails />
    </div>
  </>
);

export default IngredientDetailsPage;
