import {
  getIngredients, postOrder, restorePassword, login,
} from '../../utils/burger-api';
import { setCookie } from '../../utils/utils';
import { ACCESS_TOKEN_TTL } from '../../utils/constants';

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
export const UPDATE_CONSTRUCTOR_LIST = 'UPDATE_CONSTRUCTOR_LIST';
export const FORGOT_PASSWORD_FORM_SET_VALUE = 'FORGOT_PASSWORD_FORM_SET_VALUE';
export const FORGOT_PASSWORD_FORM_SUCCESS = 'FORGOT_PASSWORD_FORM_SUCCESS';
export const FORGOT_PASSWORD_FORM_REQUEST = 'FORGOT_PASSWORD_FORM_REQUEST';
export const FORGOT_PASSWORD_FORM_FAILED = 'FORGOT_PASSWORD_FORM_FAILED';
export const FORGOT_PASSWORD_FORM_SET_ERROR = 'FORGOT_PASSWORD_FORM_SET_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const fetchIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  getIngredients()
    .then((res) => {
      if (res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        throw new Error('Error in response');
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      }); console.log(err);
    });
};

export const getIngredientDetails = (id) => ({
  type: GET_INGREDIENT_DETAILS,
  payload: id,
});

export const clearIngredientDetails = () => ({
  type: CLEAR_INGREDIENT_DETAILS,
});

export const addConstructorIngredient = (ingredient) => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const removeConstructorIngredient = (ingredient) => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const placeOrder = (idList) => (dispatch) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  postOrder(idList)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: PLACE_ORDER_FAILED,
        });
        throw new Error('Error in response');
      }
    })
    .catch((err) => {
      dispatch({
        type: PLACE_ORDER_FAILED,
      }); console.log(err);
    });
};

export const updateConstructorList = (draggedId, uid) => ({
  type: UPDATE_CONSTRUCTOR_LIST,
  payload: { draggedId, uid },
});

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

export const postLoginForm = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return login({ email, password })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.user });
        setCookie('accessToken', res.accessToken, { expires: ACCESS_TOKEN_TTL });
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
      }
      dispatch({ type: LOGIN_FAILED });
      return res;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILED });
      console.log(err);
    });
};
