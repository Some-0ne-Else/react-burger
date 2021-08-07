import {
  getIngredients,
  postOrder,
  restorePassword,
  login,
  signup,
  getUserInfo,
  updateUserInfo,
  updateAccessToken,
  logout,
} from '../../utils/burger-api';
import { setCookie } from '../../utils/utils';
import {
  ACCESS_TOKEN_TTL, ACCESS_TOKEN, REFRESH_TOKEN, LONG_TIME_AGO_IN_THE_GALAXY,
} from '../../utils/constants';

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const CLEAR_CONSTRUCTOR_INGREDIENTS = 'CLEAR_CONSTRUCTOR_INGREDIENTS';
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
export const USER_SUCCESS = 'LOGIN_SUCCESS';
export const USER_REQUEST = 'LOGIN_REQUEST';
export const USER_FAILED = 'LOGIN_FAILED';
export const LOGOUT_USER = 'LOGOUT_USER';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const fetchIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  return getIngredients()
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
  return postOrder(idList)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          payload: res,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR_INGREDIENTS,
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
  dispatch({ type: USER_REQUEST });
  return login({ email, password })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch({ type: USER_SUCCESS, payload: res.user });
        setCookie(ACCESS_TOKEN, res.accessToken, { expires: ACCESS_TOKEN_TTL });
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
        return res;
      }
      dispatch({ type: USER_FAILED });
      return res;
    })
    .catch((err) => {
      dispatch({ type: USER_FAILED });
      console.log(err);
    });
};

export const postRegisterForm = ({ email, password, name }) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return signup({ email, password, name })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch({ type: USER_SUCCESS, payload: res.user });
        setCookie(ACCESS_TOKEN, res.accessToken, { expires: ACCESS_TOKEN_TTL });
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
        return res;
      }
      dispatch({ type: USER_FAILED });
      return res;
    })
    .catch((err) => {
      dispatch({ type: USER_FAILED });
      console.log(err);
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return getUserInfo()
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch({ type: USER_SUCCESS, payload: res.user });
        return res;
      }
      return updateAccessToken({ token: localStorage.getItem(REFRESH_TOKEN) })
        // eslint-disable-next-line max-len
        .then((refreshRes) => { console.log(JSON.stringify({ token: localStorage.getItem(REFRESH_TOKEN) })); return refreshRes.json(); })
        .then((refreshRes) => {
          if (refreshRes.success) {
            setCookie(ACCESS_TOKEN, refreshRes.accessToken, { expires: ACCESS_TOKEN_TTL });
            localStorage.setItem(REFRESH_TOKEN, refreshRes.refreshToken);
            return getUserInfo()
              .then((resAfterRefresh) => resAfterRefresh.json())
              // eslint-disable-next-line consistent-return
              .then((resAfterRefresh) => {
                if (resAfterRefresh.success) {
                  dispatch({ type: USER_SUCCESS, payload: resAfterRefresh.user });
                  return resAfterRefresh;
                }
              });
          }
          dispatch({ type: USER_FAILED });
          return refreshRes;
        });
    })
    .catch((err) => {
      dispatch({ type: USER_FAILED });
      console.log(err);
    });
};

export const updateUserData = ({ email, password, name }) => (dispatch) => {
  dispatch({ type: USER_REQUEST });
  return updateUserInfo({ email, password, name })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch({ type: USER_SUCCESS, payload: res.user });
        return res;
      }
      return updateAccessToken({ token: localStorage.getItem(REFRESH_TOKEN) })
        .then((refreshRes) => refreshRes.json())
        .then((refreshRes) => {
          if (refreshRes.success) {
            setCookie(ACCESS_TOKEN, refreshRes.accessToken, { expires: ACCESS_TOKEN_TTL });
            localStorage.setItem(REFRESH_TOKEN, refreshRes.refreshToken);
            return updateUserInfo({ email, password, name })
              .then((resAfterRefresh) => resAfterRefresh.json())
            // eslint-disable-next-line consistent-return
              .then((resAfterRefresh) => {
                if (resAfterRefresh.success) {
                  dispatch({ type: USER_SUCCESS, payload: resAfterRefresh.user });
                  return resAfterRefresh;
                }
              });
          }
          dispatch({ type: USER_FAILED });
          return refreshRes;
        });
    })
    .catch((err) => {
      dispatch({ type: USER_FAILED });
      console.log(err);
    });
};

export const logoutUser = () => (dispatch) => logout({ token: localStorage.getItem(REFRESH_TOKEN) })
  .then((res) => res.json())
  .then((res) => {
    if (res.success) {
      dispatch({ type: LOGOUT_USER });
      localStorage.removeItem(REFRESH_TOKEN);
      setCookie(ACCESS_TOKEN, null, { expires: LONG_TIME_AGO_IN_THE_GALAXY });
      return res;
    }
    Promise.reject(res.message);
    return res;
  })
  .catch((err) => console.log(err));

export const toggleModal = () => ({
  type: TOGGLE_MODAL,
});
