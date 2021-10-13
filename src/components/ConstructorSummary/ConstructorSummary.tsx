import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { placeOrder } from '../../services/actions/appActions';
import { RootState } from '../../types/index';
import { IConstructorSummaryProps } from '../../types/data';
import styles from './ConstructorSummary.module.css';

const ConstructorSummary:FC<IConstructorSummaryProps> = ({ data, openModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderRequest, orderFailed, isLoggedIn } = useSelector((store:RootState) => ({
    orderRequest: store.app.order.orderRequest,
    orderFailed: store.app.order.orderFailed,
    isLoggedIn: store.user.isLoggedIn,
  }));

  const total = React.useMemo(
    () => data.reduce((acc:number, el) => el.price + acc, 0),
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
};

export default ConstructorSummary;
