import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { placeOrder } from '../../services/actions';
import styles from './ConstructorSummary.module.css';

function ConstructorSummary({ data, openModal }) {
  const dispatch = useDispatch();
  const { orderRequest, orderFailed } = useSelector((store) => ({
    orderRequest: store.order.orderRequest,
    orderFailed: store.order.orderFailed,
  }));

  const total = React.useMemo(
    () => data.reduce((acc, el) => el.price + acc, 0),
    [data],
  );
  const handleOrder = () => {
    const idList = data.map((el) => el._id);
    dispatch(placeOrder(idList));
    // eslint-disable-next-line no-unused-expressions
    !orderRequest && !orderFailed ? openModal() : console.log('error');
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
