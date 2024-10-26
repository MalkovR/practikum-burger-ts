import {
  POST_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  RESET_ORDER,
} from "./actions";

const initialState = {
  order: null,
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER:
      return {
        ...state,
        loading: true,
      };
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    }
    case POST_ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case RESET_ORDER: {
      return {
        ...state,
        order: null,
        loading: false,
        error: null,
      };
    }
    default:
      return state;
  }
};
