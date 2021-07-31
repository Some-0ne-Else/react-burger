import React from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Signup.module.css';

function Signup() {
  return (
    <form className={styles.form}>
      <p className={`${styles.title} text text_type_main-medium mb-6`}>Регистрация</p>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input placeholder="Имя" />
      </div>
      <div className={`${styles.input_wrapper} mb-6`}>
        <EmailInput />
      </div>
      <div className={`${styles.input_wrapper} mb-6`}>
        <PasswordInput />
      </div>
      <Button type="primary" size="large">
        Зарегистрироваться
      </Button>
      <div className={`${styles.signup_wrapper} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Link to="/login" className={`${styles.link} text text_type_main-default`}>
          Войти
        </Link>
      </div>
    </form>
  );
}

export default Signup;
