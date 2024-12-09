import { describe, expect, it } from "@jest/globals";
import { initialState, reducer } from "./reducer.ts";
import * as types from "./actions.ts";
import { TBurgerIngredient } from "../../types/common.ts";
import { TSelectedIngredientActions } from "./actions.ts";

const testIngredient: TBurgerIngredient = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

describe("Selected Ingredient Reducer", () => {
  it("should return initial state", () => {
    expect(
      reducer(undefined, {
        type: "XXX",
      } as unknown as TSelectedIngredientActions),
    ).toEqual(initialState);
  });

  it("should insert ingredient", () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENT_DETAILS,
        payload: testIngredient,
      }),
    ).toEqual({
      ...initialState,
      selectedIngredient: testIngredient,
    });
  });

  it("should clear selectedIngredient, unknown state", () => {
    expect(
      reducer(undefined, { type: types.RESET_INGREDIENT_DETAILS }),
    ).toEqual(initialState);
  });

  it("should clear selectedIngredient, exists ingredient", () => {
    expect(
      reducer(
        { ...initialState, selectedIngredient: testIngredient },
        { type: types.RESET_INGREDIENT_DETAILS },
      ),
    ).toEqual(initialState);
  });
});
