import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals.ts';
import rootReducer from './services/reducers/rootReducer';
import socketMiddleware from './services/middleware/socketMiddleware';
import { WS_ALL_ORDERS_URL, WS_CURRENT_USER_URL } from './utils/constants';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START_ORDERS_ALL,
  WS_CONNECTION_START_CURRENT_USER,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE_ORDERS_ALL,
  WS_GET_MESSAGE_CURRENT_USER,
  WS_SEND_MESSAGE,
} from './services/actions/wsActions';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

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
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
