import { BASE_URL } from './constants';

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
  },
  body: JSON.stringify({ ingredients: idList }),
})
  .then((res) => res.json())
  .catch((err) => console.log('err', err));

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
