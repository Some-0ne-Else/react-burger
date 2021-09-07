import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_START } from '../../services/actions/wsActions';
import FeedItem from '../FeedItem/FeedItem';
import styles from './Feed.module.css';

function Feed() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((store) => store.ws.messages[store.ws.messages.length - 1]
  || store.ws.messages);
  // const { total, totalToday } = useSelector((store) => store.ws.messages[store.ws.messages.length - 1] || store.ws.messages);
  const readyOrders = orders?.filter((order) => order.status === 'done').splice(0, 10);
  const processingOrders = orders?.filter((order) => order.status !== 'done').splice(0, 10);
  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, []);

  return (
    <main className={`${styles.main} mt-10`}>
      <p className={`${styles.header} text text_type_main-large mb-5`}>
        Лента заказов
      </p>
      <div className={styles.container}>
        <div className={styles.feed_block}>

          <div className={styles.feed_container}>
            {orders?.map((order) => (
              <FeedItem
                key={order._id}
                id={order._id}
                createdAt={order.createdAt}
                number={order.number}
                name={order.name}
                ingredients={order.ingredients}
              />
            ))}
          </div>
        </div>
        <div className={`${styles.orders_block} ml-15`}>
          <div className={`${styles.orders} mb-15`}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <p className="text text_type_main-medium mb-6 ml-9">В работе:</p>
            <div className={styles.orders_list}>
              {readyOrders?.map((order) => (
                <p key={order._id} className="text text_type_digits-default mb-2">{order.number}</p>
              ))}
            </div>
            <div className={`${styles.orders_list} ml-9`}>
              {processingOrders?.map((order) => (
                <p key={order._id} className="text text_type_digits-default text_color_inactive mb-2">{order.number}</p>
              ))}
            </div>
          </div>
          <div className={`${styles.orders_total} mb-15`}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={`${styles.glow} text text_type_digits-large`}>{total}</p>
          </div>
          <div className={styles.orders_today}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${styles.glow} text text_type_digits-large`}>{totalToday}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Feed;
