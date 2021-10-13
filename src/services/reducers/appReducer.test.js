import reducer from './appReducer';
import * as types from '../actions/appActions';

describe('App reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_INGREDIENTS_SUCCESS,
        payload: ['data'],
      }),
    ).toEqual({
      ingredients: ['data'],
      ingredientsRequest: false,
    });
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
      reducer([], {
        type: types.GET_INGREDIENTS_REQUEST,
      }),
    ).toEqual({
      ingredientsRequest: true,
      ingredientsFailed: false,
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(
      reducer([], {
        type: types.GET_INGREDIENTS_FAILED,
      }),
    ).toEqual({
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });

  it('should handle GET_INGREDIENT_DETAILS', () => {
    expect(
      reducer({ ingredients: [{ _id: 'someId' }] }, {
        type: types.GET_INGREDIENT_DETAILS,
        payload: 'someId',
      }),
    ).toEqual({
      currentIngredient: { _id: 'someId' },
      ingredients: [{ _id: 'someId' }],
    });
  });

  it('should handle CLEAR_INGREDIENT_DETAILS', () => {
    expect(
      reducer([], {
        type: types.CLEAR_INGREDIENT_DETAILS,
      }),
    ).toEqual({
      currentIngredient: {},
    });
  });

  it('should handle ADD_CONSTRUCTOR_INGREDIENT with buns', () => {
    expect(
      reducer({
        ingredients: [{ _id: 'someId', type: 'bun' }],
        constructorIngredients: [],
      }, {
        type: types.ADD_CONSTRUCTOR_INGREDIENT,
        payload: 'someId',
      }),
    ).toEqual({
      ingredients: [{ _id: 'someId', type: 'bun' }],
      constructorIngredients: [{ _id: 'someId', type: 'bun', uid: 'someId1' }, { _id: 'someId', type: 'bun', uid: 'someId2' }],
    });
  });

  it('should handle ADD_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      reducer({
        ingredients: [{ _id: 'someId' }],
        constructorIngredients: [],
      }, {
        type: types.ADD_CONSTRUCTOR_INGREDIENT,
        payload: 'someId',
      }),
    ).toEqual({
      ingredients: [{ _id: 'someId' }],
      constructorIngredients: [{ _id: 'someId', uid: 'someId1' }],
    });
  });

  it('should handle REMOVE_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      reducer({
        constructorIngredients: [{ _id: 'someId', uid: 'someUid' }],
      }, {
        type: types.REMOVE_CONSTRUCTOR_INGREDIENT,
        payload: 'someUid',
      }),
    ).toEqual({
      constructorIngredients: [],
    });
  });

  it('should handle CLEAR_CONSTRUCTOR_INGREDIENTS', () => {
    expect(
      reducer({
        constructorIngredients: [{ _id: 'someId', uid: 'someUid' }, { _id: 'anotherId', uid: 'anotherUid' }],
      }, {
        type: types.CLEAR_CONSTRUCTOR_INGREDIENTS,
      }),
    ).toEqual({
      constructorIngredients: [],
    });
  });

  it('should handle PLACE_ORDER_REQUEST', () => {
    expect(
      reducer([], {
        type: types.PLACE_ORDER_REQUEST,
      }),
    ).toEqual({
      order: {
        orderFailed: false,
        orderRequest: true,
      },
    });
  });

  it('should handle PLACE_ORDER_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.PLACE_ORDER_SUCCESS,
        payload: { order: { number: 123456 } },
      }),
    ).toEqual({
      order: {
        orderFailed: false,
        orderRequest: false,
        orderNumber: 123456,
      },
    });
  });

  it('should handle PLACE_ORDER_FAILED', () => {
    expect(
      reducer([], {
        type: types.PLACE_ORDER_FAILED,
      }),
    ).toEqual({
      order: {
        orderFailed: true,
        orderRequest: false,
        orderNumber: 0,
      },
    });
  });

  it('should handle UPDATE_CONSTRUCTOR_LIST', () => {
    expect(
      reducer({
        constructorIngredients: [
          { _id: 'someId', uid: 'someUid' },
          { _id: 'anotherId', uid: 'anotherUid' },
          { _id: 'yetAnotherId', uid: 'yetAnotherUid' }],
      }, {
        type: types.UPDATE_CONSTRUCTOR_LIST,
        payload: { uid: 'anotherId', draggedId: 'yetAnotherUid' },
      }),
    ).toEqual({
      constructorIngredients: [
        { _id: 'someId', uid: 'someUid' },
        { _id: 'yetAnotherId', uid: 'yetAnotherUid' },
        { _id: 'anotherId', uid: 'anotherUid' }],
    });
  });
});
