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
  FORGOT_PASSWORD_FORM_SET_VALUE,
  FORGOT_PASSWORD_FORM_SUCCESS,
  FORGOT_PASSWORD_FORM_REQUEST,
  FORGOT_PASSWORD_FORM_FAILED,
  FORGOT_PASSWORD_FORM_SET_ERROR,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILED,
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
  forgotPasswordForm: {
    email: '',
    request: false,
    failed: false,
    errorText: '',
  },
  user: {
    email: '',
    name: '',
    isLoggedIn: false,
    request: false,
    failed: false,
  },
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
        const secondBun = { ...ingredient };
        secondBun.uid = Math.ceil(Math.random() * 1000000);
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
    case FORGOT_PASSWORD_FORM_SET_VALUE: {
      return {
        ...state,
        forgotPasswordForm: {
          ...state.forgotPasswordForm,
          [action.field]: action.value,
        },
      };
    }
    case FORGOT_PASSWORD_FORM_SUCCESS: {
      return {
        ...state,
        forgotPasswordForm: {
          ...state.forgotPasswordForm,
          request: false,
          failed: false,
        },
      };
    }
    case FORGOT_PASSWORD_FORM_REQUEST: {
      return {
        ...state,
        forgotPasswordForm: {
          ...state.forgotPasswordForm,
          request: true,
          failed: false,
        },
      };
    }
    case FORGOT_PASSWORD_FORM_FAILED: {
      return {
        ...state,
        forgotPasswordForm: {
          ...state.forgotPasswordForm,
          request: false,
          failed: true,
        },
      };
    }
    case FORGOT_PASSWORD_FORM_SET_ERROR: {
      return {
        ...state,
        forgotPasswordForm: {
          ...state.forgotPasswordForm,
          errorText: action.payload,
        },
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          request: false,
          failed: false,
          isLoggedIn: true,
          email: action.payload.email,
          name: action.payload.name,
        },
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        user: {
          ...state.user,
          request: true,
          failed: false,
        },
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        user: {
          ...state.user,
          request: false,
          failed: true,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default rootReducer;
