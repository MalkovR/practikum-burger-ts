import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_STOP,
  TWsActions,
} from "./actions.ts";
import { TWSOrders } from "../../types/common.ts";

type TWSState = {
  wsConnected: boolean;
  messages: TWSOrders | null;
  error?: "";
};

const initialState: TWSState = {
  wsConnected: false,
  messages: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const reducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      const { success, total, totalToday, orders } = action.payload;
      return {
        ...state,
        messages: {
          success,
          orders,
          total: total,
          totalToday: totalToday,
        },
      };

    case WS_CONNECTION_STOP: {
      return initialState;
    }

    default:
      return state;
  }
};
