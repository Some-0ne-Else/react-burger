import reducer, { initialState } from './formReducer';
import * as types from '../actions/formActions';

describe('Modal reducer', () => {
  it('should handle FORGOT_PASSWORD_FORM_SET_VALUE', () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_FORM_SET_VALUE,
        field: 'name',
        value: 'Nikolay',
      }),
    ).toEqual(
      expect.objectContaining({
        name: 'Nikolay',
      }),
    );
  });

  it('should handle FORGOT_PASSWORD_FORM_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_FORM_SUCCESS,
      }),
    ).toEqual(
      expect.objectContaining({
        request: false,
        failed: false,
        passwordRequested: true,
      }),
    );
  });

  it('should handle FORGOT_PASSWORD_FORM_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_FORM_REQUEST,
      }),
    ).toEqual(
      expect.objectContaining({
        request: true,
        failed: false,
      }),
    );
  });

  it('should handle FORGOT_PASSWORD_FORM_FAILED', () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_FORM_FAILED,
      }),
    ).toEqual(
      expect.objectContaining({
        request: false,
        failed: true,
      }),
    );
  });

  it('should handle FORGOT_PASSWORD_FORM_SET_ERROR', () => {
    expect(
      reducer(initialState, {
        type: types.FORGOT_PASSWORD_FORM_SET_ERROR,
        payload: 'Some error',
      }),
    ).toEqual(
      expect.objectContaining({
        errorText: 'Some error',
      }),
    );
  });
});
