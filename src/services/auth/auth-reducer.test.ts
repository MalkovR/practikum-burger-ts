import { describe, expect, it } from "@jest/globals";
import { initialState, reducer } from "./reducer.ts";
import * as types from "./actions.ts";
import { TUser } from "../../types/common.ts";
import { TAuthActions } from "./actions.ts";

const testUser: TUser = {
  email: "ttt@example.com",
  name: "ttt",
};

describe("Auth Reducer", () => {
  it("should return initial state", () => {
    expect(
      reducer(undefined, { type: "XXX" } as unknown as TAuthActions),
    ).toEqual(initialState);
  });

  it("should move loading to true for user registration", () => {
    expect(
      reducer(initialState, {
        type: types.USER_REGISTER_REQUEST,
      }),
    ).toEqual({ ...initialState, loading: true });
  });

  it("should fill user for user registration", () => {
    expect(
      reducer(initialState, {
        type: types.USER_REGISTER_SUCCESS,
        payload: testUser,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isUserLoaded: true,
      isAuthChecked: true,
      user: { email: testUser.email, name: testUser.name },
    });
  });

  it("should get error for user registration", () => {
    const testErrorMessage = "some_error";
    expect(
      reducer(initialState, {
        type: types.USER_REGISTER_ERROR,
        payload: testErrorMessage,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      error: testErrorMessage,
    });
  });

  it("should move loading to true for user login", () => {
    expect(
      reducer(initialState, {
        type: types.USER_LOGIN_REQUEST,
      }),
    ).toEqual({ ...initialState, loading: true });
  });

  it("should fill user for user login", () => {
    expect(
      reducer(initialState, {
        type: types.USER_LOGIN_SUCCESS,
        payload: testUser,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isUserLoaded: true,
      isAuthChecked: true,
      user: { email: testUser.email, name: testUser.name },
    });
  });

  it("should get error for user login", () => {
    const testErrorMessage = "some_error";
    expect(
      reducer(initialState, {
        type: types.USER_LOGIN_ERROR,
        payload: testErrorMessage,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      error: testErrorMessage,
    });
  });

  it("should move loading to true for user logout", () => {
    expect(
      reducer(initialState, {
        type: types.USER_LOGOUT_REQUEST,
      }),
    ).toEqual({ ...initialState, loading: true });
  });

  it("should fill user for user logout", () => {
    const initialFilledState = { ...initialState, user: testUser };
    expect(
      reducer(initialFilledState, {
        type: types.USER_LOGOUT_SUCCESS,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isUserLoaded: false,
      isAuthChecked: true,
      user: { email: "", name: "" },
    });
  });

  it("should get error for user logout", () => {
    const testErrorMessage = "some_error";
    expect(
      reducer(initialState, {
        type: types.USER_LOGOUT_ERROR,
        payload: testErrorMessage,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      error: testErrorMessage,
    });
  });

  it("should move loading to true for user profile", () => {
    expect(
      reducer(initialState, {
        type: types.USER_PROFILE_REQUEST,
      }),
    ).toEqual({ ...initialState, loading: true });
  });

  it("should fill user for user profile", () => {
    expect(
      reducer(initialState, {
        type: types.USER_PROFILE_SUCCESS,
        payload: testUser,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isUserLoaded: true,
      isAuthChecked: true,
      user: { email: testUser.email, name: testUser.name },
    });
  });

  it("should get error for user profile", () => {
    const testErrorMessage = "some_error";
    expect(
      reducer(initialState, {
        type: types.USER_PROFILE_ERROR,
        payload: testErrorMessage,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      error: testErrorMessage,
    });
  });

  it("should move loading to true for user profile update", () => {
    expect(
      reducer(initialState, {
        type: types.USER_UPDATE_PROFILE_REQUEST,
      }),
    ).toEqual({ ...initialState, loading: true });
  });

  it("should fill user for user profile update", () => {
    expect(
      reducer(initialState, {
        type: types.USER_UPDATE_PROFILE_SUCCESS,
        payload: testUser,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isUserLoaded: true,
      isAuthChecked: true,
      user: { email: testUser.email, name: testUser.name },
    });
  });

  it("should get error for user profile update", () => {
    const testErrorMessage = "some_error";
    expect(
      reducer(initialState, {
        type: types.USER_UPDATE_PROFILE_ERROR,
        payload: testErrorMessage,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      error: testErrorMessage,
    });
  });

  it("should move loading to true for token renew", () => {
    expect(
      reducer(initialState, {
        type: types.USER_RENEW_TOKEN_REQUEST,
      }),
    ).toEqual({ ...initialState, loading: true });
  });

  it("should fill user for user token renew", () => {
    expect(
      reducer(initialState, {
        type: types.USER_RENEW_TOKEN_SUCCESS,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
    });
  });

  it("should get error for user token renew", () => {
    const testErrorMessage = "some_error";
    expect(
      reducer(initialState, {
        type: types.USER_RENEW_TOKEN_ERROR,
        payload: testErrorMessage,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      error: testErrorMessage,
    });
  });

  it("should check set_auth_checked", () => {
    expect(
      reducer(initialState, {
        type: types.SET_AUTH_CHECKED,
        payload: true,
      }),
    ).toEqual({ ...initialState, loading: false, isAuthChecked: true });
  });
});
