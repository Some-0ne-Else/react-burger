import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { setForgotPasswordFormValue, postForgotPasswordForm } from '../../services/actions';
import styles from './ForgotPassword.module.css';

function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, failed, errorText } = useSelector((store) => store.forgotPasswordForm);
  const inputRef = React.useRef(null);

  const onFormChange = (e) => {
    dispatch(setForgotPasswordFormValue(e.target.name, e.target.value));
  };
  const handleRestore = (e) => {
    e.preventDefault();
    dispatch(postForgotPasswordForm(email));
    if (!failed) { history.replace({ pathname: '/reset-password' }); }
  };
  React.useEffect(() => inputRef.current.focus(), []);
  return (
    <form className={styles.form}>
      <p className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</p>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input
          placeholder="Укажите e-mail"
          type="email"
          name="email"
          ref={inputRef}
          error={failed}
          errorText={errorText}
          onChange={(e) => onFormChange(e)}
        />
      </div>
      <Button type="primary" size="large" onClick={(e) => handleRestore(e)}>
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
}

export default ForgotPassword;
