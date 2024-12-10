import { describe, expect, it } from "@jest/globals";
import { initialState, reducer } from "./reducer.ts";
import * as types from "./actions.ts";
import { TBurgerIngredient } from "../../types/common.ts";
import { TIngredientsActions } from "./actions.ts";

const testBurgetIngredients: Array<TBurgerIngredient> = [
  {
    _id: "643d69a5c3f7b9001cfa0943",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
  },
  {
    _id: "643d69a5c3f7b9001cfa0940",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0,
  },
];

describe("Burger Ingredients Reducer", () => {
  it("should return initial state", () => {
    expect(
      reducer(undefined, { type: "" } as unknown as TIngredientsActions),
    ).toEqual(initialState);
  });

  it("should move loading state to true", () => {
    expect(
      reducer(initialState, {
        type: types.INGREDIENTS_LOAD_REQUEST,
      }),
    ).toEqual({ ...initialState, loading: true });
  });

  it("should load ingredients", () => {
    expect(
      reducer(initialState, {
        type: types.INGREDIENTS_LOAD_SUCCESS,
        payload: {
          success: true,
          ingredients: testBurgetIngredients,
        },
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      success: true,
      ingredients: testBurgetIngredients,
    });
  });

  it("should loading error", () => {
    const testErrorMessage = "some_error";
    expect(
      reducer(initialState, {
        type: types.INGREDIENTS_LOAD_ERROR,
        payload: testErrorMessage,
      }),
    ).toEqual({ ...initialState, loading: false, error: testErrorMessage });
  });
});
