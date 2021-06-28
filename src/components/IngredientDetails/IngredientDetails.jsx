import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';


function IngredientDetails({ name, image, calories, proteins, fat, carbohydrates }) {
    return (
        <div className={styles.ingredientdetails}>
            <img src={image} alt={name} className={`${styles.ingredientdetails__image} mb-4`} />
            <p className={`${styles.ingredientdetails__name} mb-8 text text_type_main-medium`}>{name}</p>
            <div className={`${styles.ingredientdetails__details} mb-15`}>
                <div className={`${styles.ingredientdetails__desc} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className={`${styles.ingredientdetails__value} text text_type_digits-default text_color_inactive`}>{calories}</p>
                </div>
                <div className={`${styles.ingredientdetails__desc} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className={`${styles.ingredientdetails__value} text text_type_digits-default text_color_inactive`}>{proteins}</p>
                </div>
                <div className={`${styles.ingredientdetails__desc} mr-5`}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className={`${styles.ingredientdetails__value} text text_type_digits-default text_color_inactive`}>{fat}</p>
                </div>
                <div className={`${styles.ingredientdetails__desc}`}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className={`${styles.ingredientdetails__value} text text_type_digits-default text_color_inactive`}>{carbohydrates}</p>
                </div>
            </div>
        </div>
    )

}

export default IngredientDetails;
IngredientDetails.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
}
IngredientDetails.defaultProps = {
    name: "",
    image: "",
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
}