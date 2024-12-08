import { describe, expect, it } from "@jest/globals";
import { initialState, reducer } from "./reducer.ts";
import * as types from "./actions.ts";

describe("Feed WS Reducer", () => {
  // it('should return initial state', () => {
  //     expect(reducer(undefined, {type: ""})).toEqual(initialState)
  // });

  it("should ws_connect became success", () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_SUCCESS,
      }),
    ).toEqual({ ...initialState, wsConnected: true });
  });

  it("should ws_connect got error", () => {
    const testErrorMessage = "some_error";
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_ERROR,
        payload: testErrorMessage,
      }),
    ).toEqual({ ...initialState, wsConnected: false, error: testErrorMessage });
  });

  it("should ws_connect became closed", () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_CLOSED,
      }),
    ).toEqual({ ...initialState, wsConnected: false });
  });

  it("should ws_connect get message", () => {
    const testWsMessage = {
      success: true,
      total: 10,
      totalToday: 1,
      orders: [
        {
          createdAt: "2024-12-08T11:21:07.677Z",
          ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa0946",
          ],
          name: "Краторный экзо-плантаго минеральный люминесцентный бургер",
          number: 61901,
          status: "done",
          updatedAt: "2024-12-08T11:21:08.495Z",
          _id: "67558123e367de001daf793e",
        },
      ],
    };
    expect(
      reducer(initialState, {
        type: types.WS_GET_MESSAGE,
        payload: testWsMessage,
      }),
    ).toEqual({
      ...initialState,
      messages: {
        success: testWsMessage.success,
        orders: testWsMessage.orders,
        total: testWsMessage.total,
        totalToday: testWsMessage.totalToday,
      },
    });
  });

  it("should ws_connect became initial", () => {
    expect(
      reducer(initialState, {
        type: types.WS_CONNECTION_STOP,
      }),
    ).toEqual(initialState);
  });
});
