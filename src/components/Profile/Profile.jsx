import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Input, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserData, logoutUser } from '../../services/actions/userActions';
import styles from './Profile.module.css';

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, name } = useSelector((store) => store.user);
  const [fieldsDisabled, setFieldsDisabled] = React.useState(true);
  const [nameValue, setNameValue] = React.useState(name);
  const [emailValue, setEmailValue] = React.useState(email);
  const [passwordValue, setPasswordValue] = React.useState('');

  const toggleFieldsDisabled = () => {
    setFieldsDisabled(!fieldsDisabled);
    setEmailValue(email);
    setNameValue(name);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .then((res) => (res.success ? history.replace({ pathname: '/login' }) : console.log(res.message)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData({ name: nameValue, email: emailValue, password: passwordValue }))
      .then((res) => {
        if (res.success) {
          setFieldsDisabled(true);
        } else { console.log(res.message); }
      });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setFieldsDisabled(true);
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
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={`${styles.input_wrapper} mb-6`}>
          <Input
            placeholder="Имя"
            icon="EditIcon"
            name="name"
            value={fieldsDisabled ? name : nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            disabled={fieldsDisabled}
            onIconClick={toggleFieldsDisabled}
          />
        </div>
        <div className={`${styles.input_wrapper} mb-6`}>
          <Input
            placeholder="Логин"
            icon="EditIcon"
            name="email"
            value={fieldsDisabled ? email : emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            disabled={fieldsDisabled}
            onIconClick={toggleFieldsDisabled}
          />
        </div>
        <div className={`${styles.input_wrapper} mb-6`}>
          <Input
            placeholder="Пароль"
            icon="EditIcon"
            name="password"
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            disabled={fieldsDisabled}
            onIconClick={toggleFieldsDisabled}
          />
        </div>
        {!fieldsDisabled && (
        <div className={styles.button_container}>
          <Button type="primary" size="large">Сохранить</Button>
          <Button type="secondary" size="large" onClick={(e) => handleCancel(e)}>Отмена</Button>
        </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
