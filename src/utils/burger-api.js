import { INGREDIENTS_URL } from "./constants";

const getIngredients = () => {
  return fetch(INGREDIENTS_URL).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error ${res.status}`);
  });
};

export { getIngredients };
