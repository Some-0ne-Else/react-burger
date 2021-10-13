import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import formReducer from './formReducer';
import modalReducer from './modalReducer';
import wsReducer from './wsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  forgotPasswordForm: formReducer,
  modal: modalReducer,
  ws: wsReducer,
});

export default rootReducer;
