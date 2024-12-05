import { getOrderData } from "../../utils/burger-api";
import { AppThunk } from "../store.ts";

export const POST_ORDER: "POST_ORDER" = "POST_ORDER";
export const POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS" = "POST_ORDER_SUCCESS";
export const POST_ORDER_ERROR: "POST_ORDER_ERROR" = "POST_ORDER_ERROR";
export const RESET_ORDER: "RESET_ORDER" = "RESET_ORDER";

type TGetOrderDetails = {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly payload: {
    success: boolean;
    name: string;
    order: {
      number: number;
    };
  };
};
type TErrorOrderDetails = {
  readonly type: typeof POST_ORDER_ERROR;
  readonly payload: string;
};
type TResetOrder = {
  readonly type: typeof RESET_ORDER;
};
type TPostOrder = {
  readonly type: typeof POST_ORDER;
};

export type TOrderActions =
  | TGetOrderDetails
  | TResetOrder
  | TPostOrder
  | TErrorOrderDetails;

export const getOrderDetails: AppThunk =
  (ingredient_ids: Array<string>) => (dispatch) => {
    dispatch({ type: POST_ORDER });
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      accessToken = "Bearer " + accessToken;
      return getOrderData(ingredient_ids, accessToken)
        .then((res) => {
          const { success, name, order } = res;
          dispatch({
            type: POST_ORDER_SUCCESS,
            payload: {
              order: { number: order.number },
              name,
              success,
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: POST_ORDER_ERROR,
            payload: error.message,
          });
        });
    }
  };

export const resetOrder: AppThunk = () => (dispatch) => {
  return dispatch({
    type: RESET_ORDER,
  });
};
