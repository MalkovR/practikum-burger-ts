import {
  INGREDIENTS_LOADING,
  INGREDIENTS_LOAD_SUCCESS,
  INGREDIENTS_LOAD_ERROR,
} from "./actions";

const initialState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case INGREDIENTS_LOAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        ingredients: action.payload.data,
      };
    }
    case INGREDIENTS_LOAD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
