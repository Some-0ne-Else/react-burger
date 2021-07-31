import {
  INGREDIENTS_URL,
  ORDERS_URL,
  PASSWORD_RESET_REQUEST_URL,
  PASSWORD_RESET_URL,
  LOGIN_URL,
} from './constants';

export const getIngredients = () => fetch(INGREDIENTS_URL).then((res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Error ${res.status}`);
});

export const postOrder = (idList) => fetch(ORDERS_URL, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ ingredients: idList }),
})
  .then((res) => res.json())
  .catch((err) => console.log('err', err));

export const restorePassword = ({ email }) => fetch(PASSWORD_RESET_REQUEST_URL, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ email }),
});

export const resetPassword = ({ password, token }) => fetch(PASSWORD_RESET_URL, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ password, token }),
});
export const login = ({ email, password }) => fetch(LOGIN_URL, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});
