import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../utils/burger-api';
import styles from './ResetPassword.module.css';

function ResetPassword() {
  const passwordRequested = useSelector((store) => store.forgotPasswordForm.passwordRequested);
  const history = useHistory();
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const passwordRef = React.useRef(null);

  const handleReset = (e) => {
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
        to="/forgot-password"
      />
    );
  }
  return (
    <form className={styles.form}>
      <p className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</p>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input
          type="password"
          placeholder="Введите новый пароль"
          ref={passwordRef}
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
      <Button type="primary" size="large" onClick={(e) => handleReset(e)}>
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
}

export default ResetPassword;
