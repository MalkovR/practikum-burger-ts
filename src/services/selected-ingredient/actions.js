export const GET_INGREDIENT_DETAILS = "GET_INGREDIENT_DETAILS";
export const RESET_INGREDIENT_DETAILS = "RESET_INGREDIENT_DETAILS";

export const getIngredientsDetails = (data) => (dispatch) => {
  return dispatch({
    type: GET_INGREDIENT_DETAILS,
    payload: data,
  });
};

export const resetIngredientsDetails = () => (dispatch) => {
  return dispatch({
    type: RESET_INGREDIENT_DETAILS,
  });
};
