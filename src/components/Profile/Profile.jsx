import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PersonalAreaMenu from '../PersonalAreaMenu/PersonalAreaMenu';
import { updateUserData } from '../../services/actions/userActions';
import styles from './Profile.module.css';

function Profile() {
  const dispatch = useDispatch();
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
        <PersonalAreaMenu />
        <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
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
