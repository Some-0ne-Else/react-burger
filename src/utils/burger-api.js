import { INGREDIENTS_URL, ORDERS_URL } from './constants';

const getIngredients = () => fetch(INGREDIENTS_URL).then((res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Error ${res.status}`);
});

const postOrder = (idList) => fetch(ORDERS_URL, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ ingredients: idList }),
})
  .then((res) => res.json())
  .catch((err) => console.log('err', err));

export { getIngredients, postOrder };
