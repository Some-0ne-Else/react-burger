import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { placeOrder } from '../../services/actions';
import styles from './ConstructorSummary.module.css';

function ConstructorSummary({ data, openModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderRequest, orderFailed, isLoggedIn } = useSelector((store) => ({
    orderRequest: store.order.orderRequest,
    orderFailed: store.order.orderFailed,
    isLoggedIn: store.user.isLoggedIn,
  }));

  const total = React.useMemo(
    () => data.reduce((acc, el) => el.price + acc, 0),
    [data],
  );
  // eslint-disable-next-line consistent-return
  const handleOrder = () => {
    if (!isLoggedIn) { return history.replace({ pathname: '/login' }); }
    if ((data.findIndex((el) => el.type === 'bun')) !== -1 && data.length > 1) {
      const idList = data.map((el) => el._id);
      dispatch(placeOrder(idList));
      // eslint-disable-next-line no-unused-expressions
      !orderRequest && !orderFailed ? openModal() : console.log('error');
    } else { console.log('Please add buns in order.'); } // there should be popup with error
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
