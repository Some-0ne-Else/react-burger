import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/actions';
import styles from './Orders.module.css';

function Orders() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logoutUser())
      .then((res) => (res.success ? history.replace({ pathname: '/login' }) : console.log(res.message)));
  };
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
      </div>
      <div className={`${styles.wrapper} mb-6`}>
        <p className="text text_type_main-large">
          История заказов
        </p>
        <p className="text text_type_main-large">
          Для реализации в 4 спринте
        </p>
      </div>
    </div>
  );
}

export default Orders;
