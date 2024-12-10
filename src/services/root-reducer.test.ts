import { describe, expect, it } from "@jest/globals";
import { rootReducer } from "./root-reducer.ts";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware.ts";
import { wsActions } from "./store.ts";
import { initialState as authInitialState } from "./auth/reducer.ts";
import { initialState as orderInitialState } from "./order/reducer.ts";
import { initialState as feedInitialState } from "./feed-ws/reducer.ts";
import { initialState as burgerConstructorInitialState } from "./burger-constructor/reducer.ts";
import { initialState as burgerIngredientsInitialState } from "./burger-ingredients/reducer.ts";
import { initialState as selectedIngredientInitialState } from "./selected-ingredient/reducer.ts";

describe("Root Reducer", () => {
  it("should initialized correctly", () => {
    const testStore = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk, socketMiddleware(wsActions)),
    });
    testStore.dispatch({ type: "XXX" });
    expect(testStore.getState()).toEqual({
      burgerIngredients: burgerIngredientsInitialState,
      burgerConstructor: burgerConstructorInitialState,
      selectedIngredient: selectedIngredientInitialState,
      order: orderInitialState,
      auth: authInitialState,
      feed: feedInitialState,
    });
  });
});
