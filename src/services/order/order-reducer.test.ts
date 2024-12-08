import { describe, expect, it } from "@jest/globals";
import { initialState, reducer } from "./reducer.ts";
import * as types from "./actions.ts";
import { TOrderActions } from "./actions.ts";

describe("Order Reducer", () => {
  it("should return initial state", () => {
    expect(
      reducer(undefined, { type: "XXX" } as unknown as TOrderActions),
    ).toEqual(initialState);
  });

  it("should set loading true", () => {
    expect(
      reducer(initialState, {
        type: types.POST_ORDER_REQUEST,
      }),
    ).toEqual({ ...initialState, loading: true });
  });

  it("should set new order number", () => {
    const testOrder = {
      success: true,
      name: "some_name",
      order: { number: 15555 },
    };
    expect(
      reducer(initialState, {
        type: types.POST_ORDER_SUCCESS,
        payload: testOrder,
      }),
    ).toEqual({ ...initialState, loading: false, order: { number: 15555 } });
  });

  it("should set error", () => {
    const testErrorMessage = "some_error";
    expect(
      reducer(initialState, {
        type: types.POST_ORDER_ERROR,
        payload: testErrorMessage,
      }),
    ).toEqual({ ...initialState, loading: false, error: testErrorMessage });
  });

  it("should reset order", () => {
    expect(
      reducer(initialState, {
        type: types.RESET_ORDER,
      }),
    ).toEqual({ ...initialState, order: null, loading: false, error: null });
  });
});
