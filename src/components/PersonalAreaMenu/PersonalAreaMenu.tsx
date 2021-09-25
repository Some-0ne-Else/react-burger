import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/actions/userActions';
import { AppDispatch } from '../../types/index';
import styles from './PersonalAreaMenu.module.css';

function PersonalAreaMenu() {
  const dispatch:AppDispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logoutUser())
      .then((res: { success: boolean; message: string; }) => (
        res.success ? history.replace({ pathname: '/login' }) : console.log(res.message)));
  };
  return (
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
  );
}

export default PersonalAreaMenu;
