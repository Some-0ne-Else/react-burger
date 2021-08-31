import {
  TOGGLE_MODAL,

} from '../actions/modalActions';

const initialState = {
  modalOpen: false,
};
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default modalReducer;
