import reducer from "./userReducer";
import * as types from "../actions/userActions";

describe("Modal reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      email: "",
      name: "",
      isLoggedIn: false,
      request: false,
      failed: false,
    });
  });

  it("should handle USER_SUCCESS", () => {
    expect(
      reducer([], {
        type: types.USER_SUCCESS,
        payload: { name: "Nikifor", email: "cd@cd.ru" },
      })
    ).toEqual({
      email: "cd@cd.ru",
      name: "Nikifor",
      isLoggedIn: true,
      request: false,
      failed: false,
    });
  });

  it("should handle USER_REQUEST", () => {
    expect(
      reducer([], {
        type: types.USER_REQUEST,
      })
    ).toEqual({
      request: true,
      failed: false,
    });
  });

  it("should handle USER_FAILED", () => {
    expect(
      reducer([], {
        type: types.USER_FAILED,
      })
    ).toEqual({
        request: false,
        failed: true,
    });
  });

  it("should handle LOGOUT_USER", () => {
    expect(
      reducer([], {
        type: types.LOGOUT_USER,
      })
    ).toEqual({
        email: "",
        name: "",
        isLoggedIn: false,
        request: false,
        failed: false,
    });
  });

});
