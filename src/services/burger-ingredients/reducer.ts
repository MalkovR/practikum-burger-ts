import {
  INGREDIENTS_LOAD_ERROR,
  INGREDIENTS_LOAD_SUCCESS,
  INGREDIENTS_LOADING,
  TIngredientsActions,
} from "./actions.js";
import { TBurgerIngredient } from "../../types/common.ts";

export type TIngredientsState = {
  success: boolean;
  ingredients: Array<TBurgerIngredient>;
  loading: boolean;
  error: null | string;
};

const initialState: TIngredientsState = {
  success: false,
  ingredients: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case INGREDIENTS_LOADING:
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
