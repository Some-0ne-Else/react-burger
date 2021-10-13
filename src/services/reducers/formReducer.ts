import { TFormInitialState } from '../../types/data';
import {
  FORGOT_PASSWORD_FORM_SET_VALUE,
  FORGOT_PASSWORD_FORM_SUCCESS,
  FORGOT_PASSWORD_FORM_REQUEST,
  FORGOT_PASSWORD_FORM_FAILED,
  FORGOT_PASSWORD_FORM_SET_ERROR,
  TFormActions,
} from '../actions/formActions';

const initialState:TFormInitialState = {
  email: '',
  request: false,
  failed: false,
  errorText: '',
  passwordRequested: false,
};

const formReducer = (state = initialState, action:TFormActions) => {
  switch (action.type) {
    case FORGOT_PASSWORD_FORM_SET_VALUE: {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case FORGOT_PASSWORD_FORM_SUCCESS: {
      return {
        ...state,
        request: false,
        failed: false,
        passwordRequested: true,
      };
    }
    case FORGOT_PASSWORD_FORM_REQUEST: {
      return {
        ...state,
        request: true,
        failed: false,
      };
    }
    case FORGOT_PASSWORD_FORM_FAILED: {
      return {
        ...state,
        request: false,
        failed: true,
      };
    }
    case FORGOT_PASSWORD_FORM_SET_ERROR: {
      return {
        ...state,
        errorText: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default formReducer;
