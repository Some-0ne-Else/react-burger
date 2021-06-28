import React from "react";
import PropTypes from 'prop-types';
import styles from './Ingredient.module.css';
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Ingredient({image,price, name}) {
    const [counter, setCounter] = React.useState(1);
    return (
        <div className={`${styles.ingredient} mb-10`}>
            <img src={image} alt={name} className={`${styles.image} ml-4 mr-4 mb-1`} onClick={() => setCounter(counter + 1) }  />
            {counter ? <Counter count={counter} size="default" /> : null}
            <div className={`${styles.price} mb-1`}>
            <p className={` ${styles.price__digits} text text_type_digits-default`}>{price}</p>
            <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{name}</p>
        </div>
    )
}

export default Ingredient;

Ingredient.propTypes={
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}