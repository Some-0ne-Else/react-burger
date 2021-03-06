import {
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

export const USER_SUCCESS = 'LOGIN_SUCCESS';
export const USER_REQUEST = 'LOGIN_REQUEST';
export const USER_FAILED = 'LOGIN_FAILED';
export const LOGOUT_USER = 'LOGOUT_USER';

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
        .then((refreshRes) => refreshRes.json())
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
