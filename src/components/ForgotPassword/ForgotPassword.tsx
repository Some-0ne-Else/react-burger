import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { setForgotPasswordFormValue, postForgotPasswordForm } from '../../services/actions/formActions';
import { RootState, AppDispatch } from '../../types/index';
import styles from './ForgotPassword.module.css';

const ForgotPassword:FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const history = useHistory();
  const { email, failed, errorText } = useSelector((store:RootState) => store.forgotPasswordForm);
  const isLoggedIn = useSelector((store:RootState) => store.user.isLoggedIn);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onFormChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setForgotPasswordFormValue(e.target.name, e.target.value));
  };
  const handleRestore = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postForgotPasswordForm(email))
      .then((res: { success: boolean; }) => { if (res.success) { history.replace({ pathname: '/reset-password' }); } });
  };
  React.useEffect(() => inputRef.current!.focus(), []);

  if (isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/' }}
      />
    );
  }
  return (
    <form className={styles.form} onSubmit={(e) => handleRestore(e)}>
      <p className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</p>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input
          placeholder="Укажите e-mail"
          type="email"
          name="email"
          value={email}
          ref={inputRef}
          error={failed}
          errorText={errorText}
          onChange={(e) => onFormChange(e)}
        />
      </div>
      <Button type="primary" size="large">
        Восстановить
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

export default ForgotPassword;
