import reducer, { initialState } from './wsReducer';
import * as types from '../actions/wsActions';

describe('Web Sockets reducer', () => {
  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_SUCCESS,
      }),
    ).toEqual(expect.objectContaining({
      wsConnected: true,
    }));
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_ERROR,
      }),
    ).toEqual(expect.objectContaining({
      wsConnected: false,
    }));
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_CLOSED,
      }),
    ).toEqual(expect.objectContaining({
      wsConnected: false,
    }));
  });

  it('should handle WS_GET_MESSAGE_ORDERS_ALL', () => {
    expect(
      reducer(initialState, {
        type: types.WS_GET_MESSAGE_ORDERS_ALL,
        payload: { orders: ['data'] },
      }),
    ).toEqual(expect.objectContaining({
      messages: [{ orders: ['data'] }],
    }));
  });

  it('should handle WS_GET_MESSAGE_CURRENT_USER', () => {
    expect(
      reducer(initialState, {
        type: types.WS_GET_MESSAGE_CURRENT_USER,
        payload: { orders: ['data'] },
      }),
    ).toEqual(expect.objectContaining({
      currentUserMessages: [{ orders: ['data'] }],
    }));
  });
});
