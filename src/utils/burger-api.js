import { BASE_URL, ACCESS_TOKEN } from './constants';
import { getCookie } from './utils';

export const getIngredients = () => fetch(`${BASE_URL}/ingredients`).then((res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Error ${res.status}`);
});

export const postOrder = (idList) => fetch(`${BASE_URL}/orders`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    authorization: getCookie(ACCESS_TOKEN),
  },
  body: JSON.stringify({ ingredients: idList }),
})
  .then((res) => res.json())
  .catch((err) => console.log(err));

export const restorePassword = ({ email }) => fetch(`${BASE_URL}/password-reset`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ email }),
});

export const resetPassword = ({ password, token }) => fetch(`${BASE_URL}/password-reset/reset`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ password, token }),
});
export const login = async ({ email, password }) => fetch(`${BASE_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});

export const signup = ({ email, password, name }) => fetch(`${BASE_URL}/auth/register`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ email, password, name }),
});

export const getUserInfo = () => fetch(`${BASE_URL}/auth/user`, {
  method: 'GET',
  headers: {
    authorization: getCookie(ACCESS_TOKEN),
  },
});

export const updateUserInfo = ({ email, password, name }) => fetch(`${BASE_URL}/auth/user`, {
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
    authorization: getCookie(ACCESS_TOKEN),
  },
  body: JSON.stringify({ email, password, name }),
});

export const updateAccessToken = ({ token }) => fetch(`${BASE_URL}/auth/token`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ token }),
});

export const logout = ({ token }) => fetch(`${BASE_URL}/auth/logout`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ token }),
});
