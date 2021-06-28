import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderDetails.module.css';
import doneImg from '../../images/done.svg';

function OrderDetails({ orderId }) {
    return (
        <div className={styles.orderdetails}>
        <p className="text text_type_digits-large mb-8">{orderId}</p>
        <p className="text text_type_digits-default mb-15">идентификатор заказа</p>
        <img className={`${styles.orderdetails__image} mb-15`} src={doneImg} alt="Done"/>
        <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;

OrderDetails.propTypes = {
    orderId: PropTypes.number.isRequired,
}