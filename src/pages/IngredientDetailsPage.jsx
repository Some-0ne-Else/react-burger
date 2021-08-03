import React from 'react';
import AppHeader from '../components/AppHeader/AppHeader';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import styles from './IngredientDetailsPage.module.css';

function IngredientDetailsPage() {
  return (
    <>
      <AppHeader />
      <div className={styles.wrapper}>
        <p className="text text_type_main-large">
          Детали ингредиента
        </p>
        <IngredientDetails />
      </div>
    </>
  );
}

export default IngredientDetailsPage;
