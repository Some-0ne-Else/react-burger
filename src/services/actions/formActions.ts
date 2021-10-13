import { AppDispatch, AppThunk } from '../../types/index';
import { restorePassword } from '../../utils/burger-api';

export const FORGOT_PASSWORD_FORM_SET_VALUE = 'FORGOT_PASSWORD_FORM_SET_VALUE' as const;
export const FORGOT_PASSWORD_FORM_SUCCESS = 'FORGOT_PASSWORD_FORM_SUCCESS' as const;
export const FORGOT_PASSWORD_FORM_REQUEST = 'FORGOT_PASSWORD_FORM_REQUEST' as const;
export const FORGOT_PASSWORD_FORM_FAILED = 'FORGOT_PASSWORD_FORM_FAILED' as const;
export const FORGOT_PASSWORD_FORM_SET_ERROR = 'FORGOT_PASSWORD_FORM_SET_ERROR' as const;

export type TFormActions =
| IforgotPasswordFormSuccess
| IsetForgotPasswordFormValue
| IforgotPasswordFormRequest
| IforgotPasswordFormFailed
| IforgotPasswordFormSetValue;

export interface IforgotPasswordFormSuccess {
  readonly type: typeof FORGOT_PASSWORD_FORM_SUCCESS;
}

export interface IforgotPasswordFormRequest {
  readonly type: typeof FORGOT_PASSWORD_FORM_REQUEST;
}

export interface IforgotPasswordFormFailed {
  readonly type: typeof FORGOT_PASSWORD_FORM_FAILED;
}
export interface IforgotPasswordFormSetValue {
  readonly type: typeof FORGOT_PASSWORD_FORM_SET_ERROR,
  readonly payload: string
}

export interface IsetForgotPasswordFormValue {
  readonly type: typeof FORGOT_PASSWORD_FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export const setForgotPasswordFormValue = (field:string, value:string):IsetForgotPasswordFormValue => ({
  type: FORGOT_PASSWORD_FORM_SET_VALUE,
  field,
  value,
});

export const postForgotPasswordForm: AppThunk = (email:string) => (dispatch: AppDispatch) => {
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
