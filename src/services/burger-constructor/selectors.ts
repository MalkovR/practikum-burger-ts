import { RootState } from "../store.ts";

export const getConstructorIngredients = (state: RootState) =>
  state.burgerConstructor;
