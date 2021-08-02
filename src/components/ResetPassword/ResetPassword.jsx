import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../utils/burger-api';
import styles from './ResetPassword.module.css';

function ResetPassword() {
  // eslint-disable-next-line no-unused-vars
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
  React.useEffect(() => passwordRef.current.focus(), []);
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
