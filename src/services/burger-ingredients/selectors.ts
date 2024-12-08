import { RootState } from "../store.ts";

export const getBurgerIngredients = (state: RootState) =>
  state.burgerIngredients.ingredients;
export const getBurgerIngredientsAll = (state: RootState) =>
  state.burgerIngredients;
