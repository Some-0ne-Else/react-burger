import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../utils/burger-api';
import { RootState } from '../../types/index';
import styles from './ResetPassword.module.css';

const ResetPassword:FC = () => {
  const { passwordRequested, isLoggedIn } = useSelector((store:RootState) => (
    {
      passwordRequested: store.forgotPasswordForm.passwordRequested,
      isLoggedIn: store.user.isLoggedIn,
    }));
  const history = useHistory();
  const [password, setPassword] = React.useState<string>('');
  const [token, setToken] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [errorText, setErrorText] = React.useState<string>('');

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword({ password, token })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) { history.replace({ pathname: '/login' }); } else { setError(true); setErrorText(res.message); }
      });
  };

  if (!passwordRequested) {
    return (
      <Redirect
        to={{ pathname: '/forgot-password' }}
      />
    );
  }

  if (isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/' }}
      />
    );
  }
  return (
    <form className={styles.form} onSubmit={(e) => handleReset(e)}>
      <p className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</p>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input
          type="password"
          placeholder="Введите новый пароль"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
        />
      </div>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input
          placeholder="Введите код из письма"
          value={token}
          name="password"
          onChange={(e) => { setToken(e.target.value); setError(false); }}
          error={error}
          errorText={errorText}
        />
      </div>
      <Button type="primary" size="large">
        Сохранить
      </Button>
      <div className={`${styles.signup_wrapper} mt-20`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Link to="/login" className={`${styles.link} text text_type_main-default`}>
          Войти
        </Link>
      </div>
    </form>
  );
};

export default ResetPassword;
