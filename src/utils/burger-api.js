import { INGREDIENTS_URL } from "./constants";

const getIngredients = () =>
  fetch(INGREDIENTS_URL).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error ${res.status}`);
  });

// eslint-disable-next-line import/prefer-default-export
export { getIngredients };
