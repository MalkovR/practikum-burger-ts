import { createSelector } from "reselect";

export const getBurgerIngredients = (state) =>
  state.burgerIngredients.ingredients;
export const getBurgerIngredientsAll = (state) => state.burgerIngredients;
