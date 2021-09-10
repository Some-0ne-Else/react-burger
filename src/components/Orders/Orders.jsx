import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_START_CURRENT_USER } from '../../services/actions/wsActions';
import FeedItem from '../FeedItem/FeedItem';
import PersonalAreaMenu from '../PersonalAreaMenu/PersonalAreaMenu';
import styles from './Orders.module.css';

function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.ws.currentUserMessages[store.ws.currentUserMessages.length - 1]
  || store.ws.currentUserMessages);
  const reversedOrders = orders?.slice().reverse();
  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_CURRENT_USER });
  }, []);
  return (
    <div className={styles.orders}>
      <div className={`${styles.menu} mr-15`}>
        <PersonalAreaMenu />
        <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={`${styles.wrapper} mb-6`}>
        <div className={styles.feed_container}>
          {reversedOrders?.map((order) => (
            <FeedItem
              key={order._id}
              id={order._id}
              createdAt={order.createdAt}
              number={order.number}
              name={order.name}
              status={order.status}
              ingredients={order.ingredients}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
