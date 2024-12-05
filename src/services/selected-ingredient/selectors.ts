import { RootState } from "../store.ts";

export const getSelectedIngredient = (state: RootState) =>
  state.selectedIngredient.selectedIngredient;
