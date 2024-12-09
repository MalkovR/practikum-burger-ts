import {
  GET_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
  TSelectedIngredientActions,
} from "./actions.ts";
import { TBurgerIngredient } from "../../types/common.ts";

export type TSelectedIngredientState = {
  selectedIngredient: TBurgerIngredient | null;
};

export const initialState: TSelectedIngredientState = {
  selectedIngredient: null,
};

export const reducer = (
  state = initialState,
  action: TSelectedIngredientActions,
): TSelectedIngredientState => {
  switch (action.type) {
    case GET_INGREDIENT_DETAILS:
      return {
        ...state,
        selectedIngredient: action.payload,
      };
    case RESET_INGREDIENT_DETAILS:
      return {
        ...state,
        selectedIngredient: null,
      };
    default:
      return state;
  }
};
