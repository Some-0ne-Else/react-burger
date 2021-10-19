import reducer, { initialState } from './userReducer';
import * as types from '../actions/userActions';

describe('Modal reducer', () => {
  it('should handle USER_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.USER_SUCCESS,
        payload: { name: 'Nikifor', email: 'cd@cd.ru' },
      }),
    ).toEqual(expect.objectContaining({
      email: 'cd@cd.ru',
      name: 'Nikifor',
      isLoggedIn: true,
      request: false,
      failed: false,
    }));
  });

  it('should handle USER_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.USER_REQUEST,
      }),
    ).toEqual(expect.objectContaining({
      request: true,
      failed: false,
    }));
  });

  it('should handle USER_FAILED', () => {
    expect(
      reducer(initialState, {
        type: types.USER_FAILED,
      }),
    ).toEqual(expect.objectContaining({
      request: false,
      failed: true,
    }));
  });

  it('should handle LOGOUT_USER', () => {
    expect(
      reducer(initialState, {
        type: types.LOGOUT_USER,
      }),
    ).toEqual(expect.objectContaining({
      email: '',
      name: '',
      isLoggedIn: false,
      request: false,
      failed: false,
    }));
  });
});
