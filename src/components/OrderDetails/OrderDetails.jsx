import React from 'react';
import { useSelector } from 'react-redux';
import styles from './OrderDetails.module.css';
import doneImg from '../../images/done.svg';
import preloaderImg from '../../images/loading.png';

function OrderDetails() {
  const { orderNumber, orderRequest } = useSelector((state) => state.order);
  return (
    <div className={styles.orderdetails}>
      {orderRequest ? (<img className={styles.preloader__circle} src={preloaderImg} alt="Preloader" />) : (<p className="text text_type_digits-large mb-8">{orderNumber}</p>) }

      <p className="text text_type_digits-default mb-15">
        идентификатор заказа
      </p>
      <img
        className={`${styles.orderdetails__image} mb-15`}
        src={doneImg}
        alt="Done"
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
