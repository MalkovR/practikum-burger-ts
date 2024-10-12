import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        enhancer
    )
    return store;
}