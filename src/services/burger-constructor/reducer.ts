import {ADD_BUN, ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT, RESET_CONSTRUCTOR, TBurgerConstructorActions} from "./actions.js";
import {TBurgerIngredient, TBurgerIngredientWithUuid} from "../../types/common.ts";


export type TBurgerConstructorState = {
  bun: null | TBurgerIngredient,
  ingredients: Array<TBurgerIngredientWithUuid>,
}

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const reducer = (state = initialState, action: TBurgerConstructorActions) => {
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
                (item) => item.uuid !== action.payload.uuid,
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
