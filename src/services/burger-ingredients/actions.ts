import {getIngredientData} from "../../utils/burger-api";
import {AppThunk} from "../store.ts";
import {TBurgerIngredient} from "../../types/common.ts";

export const INGREDIENTS_LOADING: "INGREDIENTS_LOADING" = "INGREDIENTS_LOADING";
export const INGREDIENTS_LOAD_ERROR: "INGREDIENTS_LOAD_ERROR" = "INGREDIENTS_LOAD_ERROR";
export const INGREDIENTS_LOAD_SUCCESS: "INGREDIENTS_LOAD_SUCCESS" = "INGREDIENTS_LOAD_SUCCESS";


type TGetIngredientsLoading = {
  readonly type: typeof INGREDIENTS_LOADING;
}
type TGetIngredientsSuccess = {
  readonly type: typeof INGREDIENTS_LOAD_SUCCESS;
  readonly payload: {
    success: boolean;
    ingredients: Array<TBurgerIngredient>;
  };
}
type TGetIngredientsError = {
  readonly type: typeof INGREDIENTS_LOAD_ERROR;
  readonly payload: string;
}
export type TIngredientsActions = TGetIngredientsLoading | TGetIngredientsSuccess | TGetIngredientsError;

export const getIngredients: AppThunk = () => (dispatch) => {
  dispatch({ type: INGREDIENTS_LOADING });

  return getIngredientData()
    .then((res) => {
      const {success, data} = res
      dispatch({
        type: INGREDIENTS_LOAD_SUCCESS,
        payload: {
          success,
          ingredients: data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: INGREDIENTS_LOAD_ERROR,
        payload: error.message,
      });
    });
};
