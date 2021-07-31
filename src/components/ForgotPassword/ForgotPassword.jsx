import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { setForgotPasswordFormValue } from '../../services/actions';
import { restorePassword } from '../../utils/burger-api';
import styles from './ForgotPassword.module.css';

function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((store) => store.forgotPasswordForm.email);
  const inputRef = React.useRef(null);

  const onFormChange = (e) => {
    dispatch(setForgotPasswordFormValue(e.target.name, e.target.value));
  };
  const handleRestore = (e) => {
    e.preventDefault();
    restorePassword({ email })
      .then((res) => (res.success ? history.replace({ pathname: '/reset-password' }) : null));
  };
  React.useEffect(() => inputRef.current.focus(), []);
  return (
    <form className={styles.form}>
      <p className={`${styles.title} text text_type_main-medium mb-6`}>Восстановление пароля</p>
      <div className={`${styles.input_wrapper} mb-6`}>
        <Input placeholder="Укажите e-mail" name="email" ref={inputRef} onChange={(e) => onFormChange(e)} />
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
