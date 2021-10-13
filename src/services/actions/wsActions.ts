export const WS_CONNECTION_START_ORDERS_ALL = 'WS_CONNECTION_START_ORDERS_ALL' as const;
export const WS_CONNECTION_START_CURRENT_USER = 'WS_CONNECTION_START_CURRENT_USER' as const;
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS' as const;
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR' as const;
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED' as const;
export const WS_GET_MESSAGE_ORDERS_ALL = 'WS_GET_MESSAGE_ORDERS_ALL' as const;
export const WS_GET_MESSAGE_CURRENT_USER = 'WS_GET_MESSAGE_CURRENT_USER' as const;
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE' as const;

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export const wsConnectionSuccess = ():IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
}

export const wsConnectionError = () => ({
  type: WS_CONNECTION_ERROR,
});

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export const wsConnectionClosed = ():IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export interface IWsGetMessageOrdersAll {
  readonly type: typeof WS_GET_MESSAGE_ORDERS_ALL
  readonly payload: any
}

export const wsGetMessageOrdersAll = (message:any):IWsGetMessageOrdersAll => ({
  type: WS_GET_MESSAGE_ORDERS_ALL,
  payload: message,
});

export interface IWsGetMessageCurrentUser {
  readonly type: typeof WS_GET_MESSAGE_CURRENT_USER
  readonly payload: any
}

export const wsGetMessageCurrentUser = (message:any):IWsGetMessageCurrentUser => ({
  type: WS_GET_MESSAGE_CURRENT_USER,
  payload: message,
});

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE
  readonly payload: string
}
export const wsSendMessage = (message:string):IWsSendMessage => ({
  type: WS_SEND_MESSAGE,
  payload: message,
});

export type TWsActions =
 IWsConnectionSuccess
| IWsConnectionError
| IWsConnectionClosed
| IWsGetMessageOrdersAll
| IWsGetMessageCurrentUser
| IWsSendMessage;
