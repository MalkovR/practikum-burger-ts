import { describe, expect, it } from "@jest/globals";
import { initialState, reducer } from "./reducer.ts";
import * as types from "./actions.ts";
import {
  TBurgerIngredientWithUuid,
  TBurgerIngredient,
} from "../../types/common.ts";
import { TBurgerConstructorActions } from "./actions.ts";

const testNotBunIngredientsWithUuid: TBurgerIngredientWithUuid = {
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
  uuid: "954c4e26-eea9-4db5-98fc-844c3246803f",
};

const testNotBunIngredientsWithUuidOther: TBurgerIngredientWithUuid = {
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
  uuid: "3574252a-20e2-4157-949d-1fae311b65f9",
};

const testBunIngredient: TBurgerIngredient = {
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
};

describe("Burger Constructor Reducer", () => {
  it("should return initial state", () => {
    expect(
      reducer(undefined, {
        type: "XXX",
      } as unknown as TBurgerConstructorActions),
    ).toEqual(initialState);
  });

  it("should add ingredient", () => {
    expect(
      reducer(initialState, {
        type: types.ADD_INGREDIENT,
        payload: testNotBunIngredientsWithUuid,
      }),
    ).toEqual({
      ...initialState,
      ingredients: [...initialState.ingredients, testNotBunIngredientsWithUuid],
    });
  });

  it("should add bun", () => {
    expect(
      reducer(initialState, {
        type: types.ADD_BUN,
        payload: testBunIngredient,
      }),
    ).toEqual({ ...initialState, bun: testBunIngredient });
  });

  it("should remove ingredient", () => {
    const initialStateWithIngredient = {
      ...initialState,
      ingredients: [...initialState.ingredients, testNotBunIngredientsWithUuid],
    };
    expect(
      reducer(initialStateWithIngredient, {
        type: types.REMOVE_INGREDIENT,
        payload: testNotBunIngredientsWithUuid,
      }),
    ).toEqual(initialState);
  });

  it("should not remove bun", () => {
    const initialStateWithIngredient = {
      ...initialState,
      ingredients: [...initialState.ingredients, testNotBunIngredientsWithUuid],
      bun: testBunIngredient,
    };
    expect(
      reducer(initialStateWithIngredient, {
        type: types.REMOVE_INGREDIENT,
        payload: testBunIngredient as unknown as TBurgerIngredientWithUuid,
      }),
    ).toEqual(initialStateWithIngredient);
  });

  it("should reset constructor", () => {
    const initialStateWithIngredient = {
      ...initialState,
      ingredients: [...initialState.ingredients, testNotBunIngredientsWithUuid],
      bun: testBunIngredient,
    };
    expect(
      reducer(initialStateWithIngredient, {
        type: types.RESET_CONSTRUCTOR,
      }),
    ).toEqual(initialState);
  });

  it("should move ingredients", () => {
    const initialStateWithIngredients = {
      ...initialState,
      bun: testBunIngredient,
      ingredients: [
        ...initialState.ingredients,
        testNotBunIngredientsWithUuid,
        testNotBunIngredientsWithUuidOther,
      ],
    };
    expect(
      reducer(initialStateWithIngredients, {
        type: types.MOVE_INGREDIENT,
        payload: { toIndex: 0, fromIndex: 1 },
      }),
    ).toEqual({
      ...initialState,
      bun: testBunIngredient,
      ingredients: [
        ...initialState.ingredients,
        testNotBunIngredientsWithUuidOther,
        testNotBunIngredientsWithUuid,
      ],
    });
  });
});
