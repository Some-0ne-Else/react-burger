import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE_ORDERS_ALL,
  WS_GET_MESSAGE_CURRENT_USER,
} from '../actions/wsActions';

const initialState = {
  wsConnected: false,
  messages: [],
  currentUserMessages: [],
};

const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE_ORDERS_ALL:
      return {
        ...state,
        messages: state.messages.length
          ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
          : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }],
      };
    case WS_GET_MESSAGE_CURRENT_USER:
      return {
        ...state,
        currentUserMessages: state.currentUserMessages.length
          ? [...state.currentUserMessages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
          : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }],
      };
    default:
      return state;
  }
};

export default wsReducer;
