import {
  USER_SUCCESS,
  USER_REQUEST,
  USER_FAILED,
  LOGOUT_USER,

} from '../actions/userActions';

const initialState = {
  email: '',
  name: '',
  isLoggedIn: false,
  request: false,
  failed: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESS: {
      return {
        ...state,
        request: false,
        failed: false,
        isLoggedIn: true,
        email: action.payload.email,
        name: action.payload.name,
      };
    }
    case USER_REQUEST: {
      return {
        ...state,
        request: true,
        failed: false,
      };
    }
    case USER_FAILED: {
      return {
        ...state,
        request: false,
        failed: true,
      };
    }
    case LOGOUT_USER: {
      return initialState;
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
