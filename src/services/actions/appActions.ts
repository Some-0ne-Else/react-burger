import { AppDispatch, AppThunk } from '../../types/index';
import { IIngredient } from '../../types/data';
import {
  getIngredients,
  postOrder,
} from '../../utils/burger-api';

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' as const;
export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS' as const;
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS' as const;
export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT' as const;
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT' as const;
export const CLEAR_CONSTRUCTOR_INGREDIENTS = 'CLEAR_CONSTRUCTOR_INGREDIENTS' as const;
export const PLACE_ORDER = 'PLACE_ORDER' as const;
export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST' as const;
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS' as const;
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED' as const;
export const UPDATE_CONSTRUCTOR_LIST = 'UPDATE_CONSTRUCTOR_LIST' as const;

export type TAppActions =
| IGetIngredientsSuccess
| IGetIngredientsRequest
| IGetIngredientsFailed
| IGetIngredientDetails
| IClearIngredientDetails
| IAddConstructorIngredient
| IRemoveConstructorIngredient
| IUpdateConstructorList
| IClearConstructorIngredients
| IPlaceOrderSuccess
| IPlaceOrderRequest
| IPlaceOrderFailed

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
}

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientDetails {
  readonly type: typeof GET_INGREDIENT_DETAILS,
  readonly payload: string
}

export interface IClearIngredientDetails {
  readonly type: typeof CLEAR_INGREDIENT_DETAILS,
}

export interface IAddConstructorIngredient {
  readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT,
  readonly payload: string,
}

export interface IRemoveConstructorIngredient {
  readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT,
  readonly payload: string,
}

export interface IUpdateConstructorList {
  readonly type: typeof UPDATE_CONSTRUCTOR_LIST,
  readonly payload: { draggedId:string, uid:string },
}

export interface IClearConstructorIngredients {
  readonly type: typeof CLEAR_CONSTRUCTOR_INGREDIENTS
}

export interface IPlaceOrderSuccess {
  readonly type: typeof PLACE_ORDER_SUCCESS,
  readonly payload: any;
}
export interface IPlaceOrderRequest {
  readonly type: typeof PLACE_ORDER_REQUEST,
}

export interface IPlaceOrderFailed {
  readonly type: typeof PLACE_ORDER_FAILED,
}

export const getIngredientsSuccess = (res:IIngredient[]) => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: res,
});

export const getIngredientDetails = (id:string):IGetIngredientDetails => ({
  type: GET_INGREDIENT_DETAILS,
  payload: id,
});

export const clearIngredientDetails = ():IClearIngredientDetails => ({
  type: CLEAR_INGREDIENT_DETAILS,
});

export const addConstructorIngredient = (id:string):IAddConstructorIngredient => ({
  type: ADD_CONSTRUCTOR_INGREDIENT,
  payload: id,
});

export const removeConstructorIngredient = (id:string):IRemoveConstructorIngredient => ({
  type: REMOVE_CONSTRUCTOR_INGREDIENT,
  payload: id,
});

export const clearConstructorIngredients = () :IClearConstructorIngredients => ({
  type: CLEAR_CONSTRUCTOR_INGREDIENTS,
});

export const placeOrderSuccess = (res:any):IPlaceOrderSuccess => ({
  type: PLACE_ORDER_SUCCESS,
  payload: res,
});

export const placeOrderRequest = ():IPlaceOrderRequest => ({
  type: PLACE_ORDER_REQUEST,
});

export const placeOrderFailed = ():IPlaceOrderFailed => ({
  type: PLACE_ORDER_FAILED,
});

export const fetchIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  return getIngredients()
    .then((res) => {
      if (res.success) {
        dispatch(getIngredientsSuccess(res.data));
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

export const placeOrder: AppThunk = (idList:string[]) => (dispatch:AppDispatch) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  return postOrder(idList)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          payload: res,
        });
        dispatch(clearConstructorIngredients());
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

export const updateConstructorList = (draggedId:string, uid:string): IUpdateConstructorList => ({
  type: UPDATE_CONSTRUCTOR_LIST,
  payload: { draggedId, uid },
});
