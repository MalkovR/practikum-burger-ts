import {v4 as uuid} from "uuid";
import {AppThunk} from "../store.ts";
import {TBurgerIngredient, TBurgerIngredientWithUuid} from "../../types/common.ts";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT: "REMOVE_INGREDIENT" = "REMOVE_INGREDIENT";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const RESET_CONSTRUCTOR: "RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";


type TAddIngredient = {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TBurgerIngredientWithUuid;
}
type TRemoveIngredient = {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly payload: TBurgerIngredientWithUuid;
}
type TAddBun = {
  readonly type: typeof ADD_BUN;
  readonly payload: TBurgerIngredient;
}
type TResetConstructor = {
  readonly type: typeof RESET_CONSTRUCTOR;
}
type TMoveIngredient = {
  readonly type: typeof MOVE_INGREDIENT;
  payload: {
    toIndex: number,
    fromIndex: number,
  }
}

export type TBurgerConstructorActions = TAddIngredient | TRemoveIngredient | TAddBun | TResetConstructor | TMoveIngredient;

export const addIngredient: AppThunk = (data) => (dispatch) => {
  return dispatch({
    type: ADD_INGREDIENT,
    payload: { ...data, uuid: uuid() },
  });
};

export const removeIngredient: AppThunk = (ingredient) => (dispatch) => {
  return dispatch({
    type: REMOVE_INGREDIENT,
    payload: ingredient,
  });
};

export const addBun: AppThunk = (data) => (dispatch) => {
  return dispatch({
    type: ADD_BUN,
    payload: data,
  });
};

export const resetConstructor: AppThunk = () => (dispatch) => {
  return dispatch({
    type: RESET_CONSTRUCTOR,
  });
};

export const moveIngredient: AppThunk = (toIndex: number, fromIndex: number) => (dispatch) => {
  return dispatch({
    type: MOVE_INGREDIENT,
    payload: { toIndex, fromIndex },
  });
};
