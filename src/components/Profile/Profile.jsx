import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Profile.module.css';

function Profile() {
  const { email, name } = useSelector((store) => store.user);
  const [disabled, setDisabled] = React.useState(true);
  const handleClick = () => {
    setDisabled(!disabled);
  };

  const handleLogout = () => {
    console.log('Logout');
  };
  return (
    <div className={styles.profile}>
      <div className={`${styles.menu} mr-15`}>
        <ul className={`${styles.links} mb-20`}>
          <li className={styles.link}>
            <NavLink
              to="/profile"
              className={`${styles.navlink} text text_type_main-medium`}
              activeClassName={`${styles.navlink_active}`}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink
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
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form}>
        <div className={`${styles.input_wrapper} mb-6`}>
          <Input
            placeholder="Имя"
            icon="EditIcon"
            value={name}
            disabled={disabled}
            onIconClick={handleClick}
          />
        </div>
        <div className={`${styles.input_wrapper} mb-6`}>
          <Input
            placeholder="Логин"
            icon="EditIcon"
            value={email}
          />
        </div>
        <div className={`${styles.input_wrapper} mb-6`}>
          <Input placeholder="Пароль" icon="EditIcon" />
        </div>
      </form>
    </div>
  );
}

export default Profile;
