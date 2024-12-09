import {
  INGREDIENTS_LOAD_ERROR,
  INGREDIENTS_LOAD_SUCCESS,
  INGREDIENTS_LOAD_REQUEST,
  TIngredientsActions,
} from "./actions.ts";
import { TBurgerIngredient } from "../../types/common.ts";

export type TIngredientsState = {
  success: boolean;
  ingredients: Array<TBurgerIngredient>;
  loading: boolean;
  error: null | string;
};

export const initialState: TIngredientsState = {
  success: false,
  ingredients: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case INGREDIENTS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INGREDIENTS_LOAD_SUCCESS: {
      const { success, ingredients } = action.payload;
      return {
        ...state,
        loading: false,
        success: success,
        ingredients: ingredients,
      };
    }
    case INGREDIENTS_LOAD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
