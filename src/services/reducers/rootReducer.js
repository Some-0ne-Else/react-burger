import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  UPDATE_CONSTRUCTOR_LIST,

} from '../actions/index';

const initialState = {
  ingredients: [],
  constructorIngredients: [],
  currentIngredient: {},
  order: {
    orderNumber: 0,
    orderRequest: false,
    orderFailed: false,
  },
  ingredientsRequest: false,
  ingredientsFailed: false,

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredients: action.payload, ingredientsRequest: false };
    }
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true, ingredientsFailed: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsRequest: false, ingredientsFailed: true };
    }
    case GET_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: state.ingredients.find((el) => el._id === action.payload),
      };
    }
    case CLEAR_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: {},
      };
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      const ingredient = state.ingredients.find((el) => el._id === action.payload);
      const newIngredient = { ...ingredient };
      newIngredient.uid = Math.ceil(Math.random() * 1000000); // not best practice
      if (ingredient.type === 'bun') {
        return {
          ...state,
          constructorIngredients: [...state.constructorIngredients.filter((el) => el.type !== 'bun'), newIngredient],
        };
      }
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, newIngredient],
      };
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients:
        [...state.constructorIngredients.filter((el) => el.uid !== action.payload)],
      };
    }
    case PLACE_ORDER_REQUEST: {
      return {
        ...state,
        order: {
          ...state.order, orderFailed: false, orderRequest: true,
        },
      };
    }
    case PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        order: {
          ...state.order,
          orderFailed: false,
          orderRequest: false,
          orderNumber: action.payload.order.number,
        },
      };
    }
    case PLACE_ORDER_FAILED: {
      return {
        ...state,
        order: {
          ...state.order, orderFailed: true, orderRequest: false, orderNumber: 0,
        },
      };
    }
    case UPDATE_CONSTRUCTOR_LIST: {
      const arrayMove = (arr, fromIndex, toIndex) => {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
      };
      const destanationIndex = state.constructorIngredients
        .findIndex((el) => el.uid === action.payload.uid);
      const originalIndex = state.constructorIngredients
        .findIndex((el) => el.uid === action.payload.draggedId);
      const newArr = [...state.constructorIngredients];
      arrayMove(newArr, originalIndex, destanationIndex);

      return {
        ...state,
        constructorIngredients: newArr,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default rootReducer;
