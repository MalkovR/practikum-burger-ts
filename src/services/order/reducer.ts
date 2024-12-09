import {
  POST_ORDER_REQUEST,
  POST_ORDER_ERROR,
  POST_ORDER_SUCCESS,
  RESET_ORDER,
  TOrderActions,
} from "./actions";

export type TOrderState = {
  success: boolean;
  name: string | null;
  order: {
    number: number | null;
  };
  loading: boolean;
  error: null | string;
};

export const initialState: TOrderState = {
  success: true,
  name: null,
  order: { number: null },
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ORDER_SUCCESS: {
      const {
        order: { number },
      } = action.payload;
      return {
        ...state,
        loading: false,
        order: {
          number: number,
        },
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
