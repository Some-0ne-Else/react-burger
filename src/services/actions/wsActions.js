export const WS_CONNECTION_START_ORDERS_ALL = 'WS_CONNECTION_START_ORDERS_ALL';
export const WS_CONNECTION_START_CURRENT_USER = 'WS_CONNECTION_START_CURRENT_USER';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE_ORDERS_ALL = 'WS_GET_MESSAGE_ORDERS_ALL';
export const WS_GET_MESSAGE_CURRENT_USER = 'WS_GET_MESSAGE_CURRENT_USER';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const wsConnectionSuccess = () => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = () => ({
  type: WS_CONNECTION_ERROR,
});

export const wsConnectionClosed = () => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessageOrdersAll = (message) => ({
  type: WS_GET_MESSAGE_ORDERS_ALL,
  payload: message,
});
export const wsGetMessageCurrentUser = (message) => ({
  type: WS_GET_MESSAGE_CURRENT_USER,
  payload: message,
});

export const wsSendMessage = (message) => ({
  type: WS_SEND_MESSAGE,
  payload: message,
});
