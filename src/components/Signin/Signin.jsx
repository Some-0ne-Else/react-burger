import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link, useHistory, Redirect, useLocation,
} from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Signin.module.css';
import { postLoginForm } from '../../services/actions';

// eslint-disable-next-line react/prop-types
function Signin() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(postLoginForm({ email, password }))
      .then((res) => {
        if (res.success) {
          history.replace({ pathname: '/' });
        } else { console.log(res.message); }
      });
  };

  if (isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: location.state?.from?.pathname || '/' }}
      />
    );
  }
  return (
    <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
      <p className={`${styles.title} text text_type_main-medium mb-6`}>Вход</p>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={`${styles.input_wrapper} mb-6`}>
        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
