import reducer, { initialState } from './modalReducer';
import * as types from '../actions/modalActions';

describe('Modal reducer', () => {
  it('should handle TOGGLE_MODAL', () => {
    expect(
      reducer(initialState, {
        type: types.TOGGLE_MODAL,
      }),
    ).toEqual({
      modalOpen: true,
    });
  });
});
