import {
  TOGGLE_MODAL,
  TModalActions,
} from '../actions/modalActions';
import { TModalInitialState } from '../../types/data';

export const initialState:TModalInitialState = {
  modalOpen: false,
};

const modalReducer = (state = initialState, action:TModalActions) => {
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
