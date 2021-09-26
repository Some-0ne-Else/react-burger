import React, { FC } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { postRegisterForm } from '../../services/actions/userActions';
import { RootState, AppDispatch } from '../../types/index';
import styles from './Signup.module.css';

const Signup:FC = () => {
  const history = useHistory();
  const dispatch:AppDispatch = useDispatch();
  const isLoggedIn = useSelector((store:RootState) => store.user.isLoggedIn);
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleSignup = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postRegisterForm({ name, email, password }))
      .then((res: { success: boolean; message: string; }) => {
        if (res.success) {
          history.replace({ pathname: '/' });
        } else { console.log(res.message); }
      });
  };

  if (isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/' }}
      />
    );
  }
  return (
    <form className={styles.form} onSubmit={(e) => handleSignup(e)}>
      <p className={`${styles.title} text text_type_main-medium mb-6`}>Регистрация</p>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input
          placeholder="Имя"
          value={name}
          name="email"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input
          placeholder="E-mail"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={`${styles.input_wrapper} mb-6`}>
        <PasswordInput
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
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
};

export default Signup;
