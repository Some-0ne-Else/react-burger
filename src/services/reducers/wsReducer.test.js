import reducer from './wsReducer';
import * as types from '../actions/wsActions';

describe('Web Sockets reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      wsConnected: false,
      messages: [],
      currentUserMessages: [],
    });
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.WS_CONNECTION_SUCCESS,
      }),
    ).toEqual({
      wsConnected: true,
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      reducer([], {
        type: types.WS_CONNECTION_ERROR,
      }),
    ).toEqual({
      wsConnected: false,
    });
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      reducer([], {
        type: types.WS_CONNECTION_CLOSED,
      }),
    ).toEqual({
      wsConnected: false,
    });
  });

  it('should handle WS_GET_MESSAGE_ORDERS_ALL', () => {
    expect(
      reducer([], {
        type: types.WS_GET_MESSAGE_ORDERS_ALL,
        payload: { orders: ['data'] },
      }),
    ).toEqual({
      messages: [{ orders: ['data'], timestamp: new Date().getTime() / 1000 }],
    });
  });

  it('should handle WS_GET_MESSAGE_CURRENT_USER', () => {
    expect(
      reducer([], {
        type: types.WS_GET_MESSAGE_CURRENT_USER,
        payload: { orders: ['data'] },
      }),
    ).toEqual({
      currentUserMessages: [{ orders: ['data'], timestamp: new Date().getTime() / 1000 }],
    });
  });
});
