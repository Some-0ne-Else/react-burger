import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../services/reducers/rootReducer';
import socketMiddleware from '../services/middleware/socketMiddleware';
import { WS_ALL_ORDERS_URL, WS_CURRENT_USER_URL } from '../utils/constants';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START_ORDERS_ALL,
  WS_CONNECTION_START_CURRENT_USER,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE_ORDERS_ALL,
  WS_GET_MESSAGE_CURRENT_USER,
  WS_SEND_MESSAGE,
} from '../services/actions/wsActions';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
// const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//   : compose;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsActionsAll = {
  wsInit: WS_CONNECTION_START_ORDERS_ALL,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE_ORDERS_ALL,
};

const wsActionsCurrentUser = {
  wsInit: WS_CONNECTION_START_CURRENT_USER,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE_CURRENT_USER,
};

const enhancer = composeEnhancers(applyMiddleware(thunk,
  socketMiddleware(WS_CURRENT_USER_URL, wsActionsCurrentUser),
  socketMiddleware(WS_ALL_ORDERS_URL, wsActionsAll)));

const store = createStore(rootReducer, enhancer);

export default store;
