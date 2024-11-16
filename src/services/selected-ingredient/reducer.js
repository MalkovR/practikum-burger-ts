import {GET_INGREDIENT_DETAILS, RESET_INGREDIENT_DETAILS} from "./actions";

const initialState = {
  selectedIngredient: null,
};

export const reducer = (state = initialState, action) => {
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
