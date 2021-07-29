/* eslint-disable no-debugger */
import { getIngredients, postOrder } from '../../utils/burger-api';

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
export const UPDATE_CONSTRUCTOR_LIST = 'UPDATE_CONSTRUCTOR_LIST';

export const fetchIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  getIngredients()
    .then((res) => {
      if (res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        throw new Error('Error in response');
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      }); console.log(err);
    });
};

export const getIngredientDetails = (id) => ({
  type: GET_INGREDIENT_DETAILS,
  payload: id,
});

export const clearIngredientDetails = () => ({
  type: CLEAR_INGREDIENT_DETAILS,
});

export const addConstructorIngredient = (ingredient) => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const removeConstructorIngredient = (ingredient) => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const placeOrder = (idList) => (dispatch) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  postOrder(idList)
    .then((res) => {
      if (res.success) {
        console.log(res);
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: PLACE_ORDER_FAILED,
        });
        throw new Error('Error in response');
      }
    })
    .catch((err) => {
      dispatch({
        type: PLACE_ORDER_FAILED,
      }); console.log(err);
    });
};

export const updateConstructorList = (draggedId, uid) => ({
  type: UPDATE_CONSTRUCTOR_LIST,
  payload: { draggedId, uid },
});
