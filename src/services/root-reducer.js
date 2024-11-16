import {combineReducers} from "redux";
import {reducer as burgerIngredientsReducer} from "./burger-ingredients/reducer";
import {reducer as burgerConstructorReducer} from "./burger-constructor/reducer";
import {reducer as selectedIngredientReducer} from "./selected-ingredient/reducer";
import {reducer as orderReducer} from "./order/reducer";
import {reducer as authReducer} from "./auth/reducer";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  selectedIngredient: selectedIngredientReducer,
  order: orderReducer,
  auth: authReducer,
});
