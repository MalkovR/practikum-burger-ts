import { TBurgerIngredient } from "../../types/common.ts";
import { AppThunk } from "../store.ts";

export const GET_INGREDIENT_DETAILS: "GET_INGREDIENT_DETAILS" =
  "GET_INGREDIENT_DETAILS";
export const RESET_INGREDIENT_DETAILS: "RESET_INGREDIENT_DETAILS" =
  "RESET_INGREDIENT_DETAILS";

type TGetIngredientsDetails = {
  readonly type: typeof GET_INGREDIENT_DETAILS;
  readonly payload: TBurgerIngredient;
};

type TResetIngredientsDetails = {
  readonly type: typeof RESET_INGREDIENT_DETAILS;
};

export const getIngredientsDetails: AppThunk = (data) => (dispatch) => {
  return dispatch({
    type: GET_INGREDIENT_DETAILS,
    payload: data,
  });
};

export const resetIngredientsDetails: AppThunk = () => (dispatch) => {
  return dispatch({
    type: RESET_INGREDIENT_DETAILS,
  });
};

export type TSelectedIngredientActions =
  | TGetIngredientsDetails
  | TResetIngredientsDetails;
