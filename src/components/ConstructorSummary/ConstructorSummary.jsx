import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { postOrder } from '../../utils/burger-api';
import styles from './ConstructorSummary.module.css';

function ConstructorSummary({ data, openModal }) {
  const total = React.useMemo(
    () => data.reduce((acc, el) => el.price + acc, 0),
    [data],
  );
  const handleOrder = () => {
    const idList = data.map((el) => el._id);
    postOrder(idList)
      .then((res) => {
        if (res.success) { openModal(res.order.number); } else { throw new Error(res.message); }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={`${styles.summary} mr-4`}>
      <div className={`${styles.total} mr-10`}>
        <p className="text text_type_digits-medium">{total}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={handleOrder}>
        Оформить заказ
      </Button>
    </div>
  );
}

export default ConstructorSummary;

ConstructorSummary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
