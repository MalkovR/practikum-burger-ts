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
import {socketMiddleware} from "./middleware/socket-middleware.ts";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  TWsActions,
} from "./feed-ws/actions.ts";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  wsStop: WS_CONNECTION_STOP,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)  => getDefaultMiddleware().concat(thunk, socketMiddleware(wsActions)),
})

export type TAppActions = TSelectedIngredientActions | TOrderActions | TIngredientsActions | TBurgerConstructorActions | TAuthActions | TWsActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch | AppThunk = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
