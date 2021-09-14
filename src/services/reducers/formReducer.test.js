import reducer from './formReducer';
import * as types from '../actions/formActions';

describe('Modal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      email: '',
      request: false,
      failed: false,
      errorText: '',
      passwordRequested: false,
    });
  });

  it('should handle FORGOT_PASSWORD_FORM_SET_VALUE', () => {
    expect(
      reducer([], {
        type: types.FORGOT_PASSWORD_FORM_SET_VALUE,
        field: 'name',
        value: 'Nikolay',
      }),
    ).toEqual({
      name: 'Nikolay',
    });
  });

  it('should handle FORGOT_PASSWORD_FORM_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.FORGOT_PASSWORD_FORM_SUCCESS,
      }),
    ).toEqual({
      request: false,
      failed: false,
      passwordRequested: true,
    });
  });

  it('should handle FORGOT_PASSWORD_FORM_REQUEST', () => {
    expect(
      reducer([], {
        type: types.FORGOT_PASSWORD_FORM_REQUEST,
      }),
    ).toEqual({
      request: true,
      failed: false,
    });
  });

  it('should handle FORGOT_PASSWORD_FORM_FAILED', () => {
    expect(
      reducer([], {
        type: types.FORGOT_PASSWORD_FORM_FAILED,
      }),
    ).toEqual({
      request: false,
      failed: true,
    });
  });

  it('should handle FORGOT_PASSWORD_FORM_SET_ERROR', () => {
    expect(
      reducer([], {
        type: types.FORGOT_PASSWORD_FORM_SET_ERROR,
        payload: 'Some error',
      }),
    ).toEqual({
      errorText: 'Some error',
    });
  });
});
