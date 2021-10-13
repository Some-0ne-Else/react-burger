import { IConstructorIngredient, IIngredient, TappInitialState } from '../../types/data';
import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRUCTOR_INGREDIENTS,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  UPDATE_CONSTRUCTOR_LIST,
  TAppActions,
} from '../actions/appActions';

const initialState:TappInitialState = {
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

const appReducer = (state = initialState, action:TAppActions) => {
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
      const ingredient:IIngredient = state.ingredients.find((el) => el._id === action.payload)!;
      const newIngredient:IIngredient = { ...ingredient };
      newIngredient.uid = `${ingredient._id}${state.constructorIngredients.filter((el) => el._id === ingredient._id).length + 1}`;
      if (ingredient.type === 'bun') {
        const secondBun = { ...ingredient };
        secondBun.uid = `${ingredient._id}${state.constructorIngredients.filter((el) => el._id === ingredient._id).length + 2}`;
        return {
          ...state,
          constructorIngredients: [...state.constructorIngredients.filter((el) => el.type !== 'bun'), newIngredient, secondBun],
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
    case CLEAR_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: initialState.constructorIngredients,
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
      const arrayMove = (arr:IConstructorIngredient[], fromIndex:number, toIndex:number) => {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
      };
      const destinationIndex = state.constructorIngredients
        .findIndex((el) => el.uid === action.payload.uid);
      const originalIndex = state.constructorIngredients
        .findIndex((el) => el.uid === action.payload.draggedId);
      const newArr = [...state.constructorIngredients];
      arrayMove(newArr, originalIndex, destinationIndex);

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

export default appReducer;
