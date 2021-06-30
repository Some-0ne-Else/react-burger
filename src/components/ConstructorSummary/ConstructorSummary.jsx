import React from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ConstructorSummary.module.css";

function ConstructorSummary({ total, openModal }) {
  const orderId = 34536;

  return (
    <div className={`${styles.summary} mr-4`}>
      <div className={`${styles.total} mr-10`}>
        <p className="text text_type_digits-medium">{total}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={() => openModal(orderId)}>
        Оформить заказ
      </Button>
    </div>
  );
}

export default ConstructorSummary;

ConstructorSummary.propTypes = {
  total: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};
