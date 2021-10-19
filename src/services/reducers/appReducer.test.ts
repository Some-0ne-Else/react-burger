import reducer, { initialState } from './appReducer';
import * as types from '../actions/appActions';
import { IIngredient } from '../../types/data';

const sampleIngredient: IIngredient = {
  _id: '123',
  name: 'test',
  type: 'type',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: 'https://',
  // eslint-disable-next-line camelcase
  image_mobile: '',
  // eslint-disable-next-line camelcase
  image_large: 'https://',
  __v: 0,
};

const anotherIngredient:IIngredient = {
  _id: '222',
  uid: '333',
  name: 'test',
  type: 'type',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: 'https://',
  // eslint-disable-next-line camelcase
  image_mobile: '',
  // eslint-disable-next-line camelcase
  image_large: 'https://',
  __v: 0,
};

const yetAnotherIngredient:IIngredient = {
  _id: '333',
  uid: '444',
  name: 'test',
  type: 'type',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: 'https://',
  // eslint-disable-next-line camelcase
  image_mobile: '',
  // eslint-disable-next-line camelcase
  image_large: 'https://',
  __v: 0,
};

const sampleState = {
  ingredients: [sampleIngredient],
  constructorIngredients: [anotherIngredient, yetAnotherIngredient],
  currentIngredient: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    // eslint-disable-next-line camelcase
    image_mobile: '',
    // eslint-disable-next-line camelcase
    image_large: '',
    __v: 0,
  },
  order: {
    orderNumber: 0,
    orderRequest: false,
    orderFailed: false,
  },
  ingredientsRequest: false,
  ingredientsFailed: false,
};

describe('App reducer', () => {
  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENTS_SUCCESS,
        payload: [sampleIngredient],
      }),
    ).toEqual(expect.objectContaining({
      ingredients: [sampleIngredient],
      ingredientsRequest: false,
    }));
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENTS_REQUEST,
      }),
    ).toEqual(expect.objectContaining({
      ingredientsRequest: true,
      ingredientsFailed: false,
    }));
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENTS_FAILED,
      }),
    ).toEqual(expect.objectContaining({
      ingredientsRequest: false,
      ingredientsFailed: true,
    }));
  });

  it('should handle GET_INGREDIENT_DETAILS', () => {
    expect(
      reducer(sampleState, {
        type: types.GET_INGREDIENT_DETAILS,
        payload: '123',
      }),
    ).toEqual(expect.objectContaining({
      currentIngredient: sampleIngredient,
    }));
  });

  it('should handle CLEAR_INGREDIENT_DETAILS', () => {
    expect(
      reducer(initialState, {
        type: types.CLEAR_INGREDIENT_DETAILS,
      }),
    ).toEqual(expect.objectContaining({
      currentIngredient: {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        // eslint-disable-next-line camelcase
        image_mobile: '',
        // eslint-disable-next-line camelcase
        image_large: '',
        __v: 0,
      },
    }));
  });

  it('should handle ADD_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      reducer(sampleState, {
        type: types.ADD_CONSTRUCTOR_INGREDIENT,
        payload: '123',
      }),
    ).toEqual(expect.objectContaining({
      constructorIngredients: [anotherIngredient, yetAnotherIngredient, { ...sampleIngredient, uid: sampleIngredient._id + 1 }],
    }));
  });

  it('should handle REMOVE_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      reducer(sampleState, {
        type: types.REMOVE_CONSTRUCTOR_INGREDIENT,
        payload: '333',
      }),
    ).toEqual(expect.objectContaining({
      constructorIngredients: [yetAnotherIngredient],
    }));
  });

  it('should handle CLEAR_CONSTRUCTOR_INGREDIENTS', () => {
    expect(
      reducer(initialState, {
        type: types.CLEAR_CONSTRUCTOR_INGREDIENTS,
      }),
    ).toEqual(expect.objectContaining({
      constructorIngredients: [],
    }));
  });

  it('should handle PLACE_ORDER_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.PLACE_ORDER_REQUEST,
      }),
    ).toEqual(expect.objectContaining({
      order: {
        orderFailed: false,
        orderRequest: true,
        orderNumber: 0,
      },
    }));
  });

  it('should handle PLACE_ORDER_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.PLACE_ORDER_SUCCESS,
        payload: { order: { number: 123456 } },
      }),
    ).toEqual(expect.objectContaining({
      order: {
        orderFailed: false,
        orderRequest: false,
        orderNumber: 123456,
      },
    }));
  });

  it('should handle PLACE_ORDER_FAILED', () => {
    expect(
      reducer(initialState, {
        type: types.PLACE_ORDER_FAILED,
      }),
    ).toEqual(expect.objectContaining({
      order: {
        orderFailed: true,
        orderRequest: false,
        orderNumber: 0,
      },
    }));
  });

  it('should handle UPDATE_CONSTRUCTOR_LIST', () => {
    expect(
      reducer(sampleState, {
        type: types.UPDATE_CONSTRUCTOR_LIST,
        payload: { uid: '333', draggedId: '444' },
      }),
    ).toEqual(expect.objectContaining({
      constructorIngredients: [yetAnotherIngredient, anotherIngredient],
    }));
  });
});
