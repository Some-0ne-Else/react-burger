import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE_ORDERS_ALL,
  WS_GET_MESSAGE_CURRENT_USER,
  TWsActions,
} from '../actions/wsActions';
import { TWsInitialState } from '../../types/data';

export const initialState:TWsInitialState = {
  wsConnected: false,
  messages: [],
  currentUserMessages: [],
};

const wsReducer = (state = initialState, action:TWsActions) => {
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
        messages: [{ ...action.payload }],
      };
    case WS_GET_MESSAGE_CURRENT_USER:
      return {
        ...state,
        currentUserMessages: [{ ...action.payload }],
      };
    default:
      return state;
  }
};

export default wsReducer;
