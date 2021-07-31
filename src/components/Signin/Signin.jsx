import React from 'react';
import { Link } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Signin.module.css';

function Signin() {
  return (
    <form className={styles.form}>
      <p className={`${styles.title} text text_type_main-medium mb-6`}>Вход</p>
      <div className={`${styles.input_wrapper} mb-6`}>
        <EmailInput />
      </div>
      <div className={`${styles.input_wrapper} mb-6`}>
        <PasswordInput />
      </div>
      <Button type="primary" size="large">
        Войти
      </Button>
      <div className={`${styles.signup_wrapper} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </p>
        <Link to="/register" className={`${styles.link} text text_type_main-default`}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={`${styles.signup_wrapper} mt-4`}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Link to="/forgot-password" className={`${styles.link} text text_type_main-default`}>
          Восстановить пароль
        </Link>
      </div>
    </form>
  );
}

export default Signin;
