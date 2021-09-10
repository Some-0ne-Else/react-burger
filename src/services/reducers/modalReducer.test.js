import reducer from "./modalReducer";
import * as types from "../actions/modalActions";

describe("Modal reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      modalOpen: false,
    });
  });

  it("should handle TOGGLE_MODAL", () => {
    expect(
      reducer([], {
        type: types.TOGGLE_MODAL,
      })
    ).toEqual({
      modalOpen: true,
    });
  });
});
