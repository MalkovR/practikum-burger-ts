import {ActionCreator, Action} from "redux";
import {rootReducer} from "./root-reducer";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {thunk} from "redux-thunk";
import {ThunkAction} from "redux-thunk";
import {TSelectedIngredientActions} from "./selected-ingredient/actions";
import {TOrderActions} from "./order/actions";
import {TIngredientsActions} from "./burger-ingredients/actions";
import {TBurgerConstructorActions} from "./burger-constructor/actions";
import {TAuthActions} from "./auth/actions";
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)  => getDefaultMiddleware().concat(thunk),
})

type TAppActions = TSelectedIngredientActions | TOrderActions | TIngredientsActions | TBurgerConstructorActions | TAuthActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
