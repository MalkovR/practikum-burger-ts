import { Middleware, MiddlewareAPI } from "redux";
import { RootState, AppDispatch } from "../store";
import { TAppActions } from "../store";

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_STOP,
} from "../feed-ws/actions.ts";

export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
  wsStop: typeof WS_CONNECTION_STOP;
};

export const socketMiddleware = (
  wsActions: TWSStoreActions,
): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TAppActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsStop } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${action.payload}`);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsStop) {
          socket?.close();
        }
      }

      next(action);
    };
  }) as Middleware;
};
