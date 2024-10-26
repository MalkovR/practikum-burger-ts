import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  RESET_CONSTRUCTOR,
  MOVE_INGREDIENT,
} from "./actions";

const initialState = {
  bun: null,
  ingredients: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ADD_BUN:
      return {
        ...state,
        bun: action.payload,
      };
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients:
          action.payload.type === "bun"
            ? [...state.ingredients]
            : [...state.ingredients].filter(
                (item) => item.uuid !== action.payload,
              ),
      };
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        ingredients: [],
      };
    }
    case MOVE_INGREDIENT: {
      const currentIngredients = [...state.ingredients];
      currentIngredients.splice(
        action.payload.toIndex,
        0,
        currentIngredients.splice(action.payload.fromIndex, 1)[0],
      );
      return {
        ...state,
        ingredients: currentIngredients,
      };
    }
    default:
      return state;
  }
};
