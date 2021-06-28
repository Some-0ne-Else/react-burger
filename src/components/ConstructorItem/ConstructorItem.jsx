import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConstructorItem.module.css'
import {
    ConstructorElement,
    DragIcon
  } from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorItem({name, price, image}) {

  return (
            <div className={styles.item}>
              <DragIcon type="primary"/>
              <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
              />
            </div>
    );
}

export default ConstructorItem;

ConstructorItem.propTypes ={
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}