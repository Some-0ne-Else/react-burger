import reducer from './rootReducer';

describe('Root reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        app: {
          constructorIngredients: [],
          currentIngredient: {},
          ingredients: [],
          ingredientsFailed: false,
          ingredientsRequest: false,
          order: {
            orderFailed: false,
            orderNumber: 0,
            orderRequest: false,
          },
        },
        forgotPasswordForm: {
          email: '',
          errorText: '',
          failed: false,
          passwordRequested: false,
          request: false,
        },
        modal: {
          modalOpen: false,
        },
        user: {
          email: '',
          failed: false,
          isLoggedIn: false,
          name: '',
          request: false,
        },
        ws: {
          currentUserMessages: [],
          messages: [],
          wsConnected: false,
        },
      },
    );
  });
});
