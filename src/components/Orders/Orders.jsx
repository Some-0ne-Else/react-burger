import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../services/actions/userActions';
import { WS_CONNECTION_START_CURRENT_USER } from '../../services/actions/wsActions';
import FeedItem from '../FeedItem/FeedItem';
import styles from './Orders.module.css';

function Orders() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orders } = useSelector((store) => store.ws.currentUserMessages[store.ws.currentUserMessages.length - 1]
  || store.ws.currentUserMessages);
  const reversedOrders = orders?.slice().reverse();
  const handleLogout = () => {
    dispatch(logoutUser())
      .then((res) => (res.success ? history.replace({ pathname: '/login' }) : console.log(res.message)));
  };
  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_CURRENT_USER });
  }, []);
  return (
    <div className={styles.orders}>
      <div className={`${styles.menu} mr-15`}>
        <ul className={`${styles.links} mb-20`}>
          <li className={styles.link}>
            <NavLink
              exact
              to="/profile"
              className={`${styles.navlink} text text_type_main-medium`}
              activeClassName={`${styles.navlink_active}`}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink
              exact
              to="/profile/orders"
              className={`${styles.navlink} text text_type_main-medium`}
              activeClassName={`${styles.navlink_active}`}
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.link}>
            <button type="button" onClick={handleLogout} className={`${styles.logout} text text_type_main-medium`}>Выход</button>
          </li>
        </ul>
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
              ingredients={order.ingredients}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
