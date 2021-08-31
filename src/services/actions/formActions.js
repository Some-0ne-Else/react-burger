import {

  restorePassword,
} from '../../utils/burger-api';

export const FORGOT_PASSWORD_FORM_SET_VALUE = 'FORGOT_PASSWORD_FORM_SET_VALUE';
export const FORGOT_PASSWORD_FORM_SUCCESS = 'FORGOT_PASSWORD_FORM_SUCCESS';
export const FORGOT_PASSWORD_FORM_REQUEST = 'FORGOT_PASSWORD_FORM_REQUEST';
export const FORGOT_PASSWORD_FORM_FAILED = 'FORGOT_PASSWORD_FORM_FAILED';
export const FORGOT_PASSWORD_FORM_SET_ERROR = 'FORGOT_PASSWORD_FORM_SET_ERROR';

export const setForgotPasswordFormValue = (field, value) => ({
  type: FORGOT_PASSWORD_FORM_SET_VALUE,
  field,
  value,
});

export const postForgotPasswordForm = (email) => (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_FORM_REQUEST });
  return restorePassword({ email })
    .then((res) => res.json())
    // eslint-disable-next-line consistent-return
    .then((res) => {
      if (res.success) {
        dispatch({ type: FORGOT_PASSWORD_FORM_SUCCESS });
        return res;
      }
      dispatch({ type: FORGOT_PASSWORD_FORM_FAILED });
      dispatch({ type: FORGOT_PASSWORD_FORM_SET_ERROR, payload: res.message });
    })
    .catch((err) => {
      dispatch({ type: FORGOT_PASSWORD_FORM_FAILED }); console.log(err);
    });
};
