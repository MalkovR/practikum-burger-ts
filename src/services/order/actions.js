import {getOrderData} from "../../utils/burger-api";

export const POST_ORDER = "POST_ORDER";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_ERROR = "POST_ORDER_ERROR";
export const RESET_ORDER = "RESET_ORDER";

export const getOrderDetails = (ingredient_ids) => (dispatch) => {
  dispatch({ type: POST_ORDER });

  return getOrderData(ingredient_ids)
    .then((res) => {
      dispatch({
        type: POST_ORDER_SUCCESS,
        payload: res.order,
      });
    })
    .catch((error) => {
      dispatch({
        type: POST_ORDER_ERROR,
        payload: error.message,
      });
    });
};

export const resetOrder = () => {
  return {
    type: RESET_ORDER,
  };
};
