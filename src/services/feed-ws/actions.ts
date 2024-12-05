import {TWSOrder} from "../../types/common.ts";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_STOP: 'WS_CONNECTION_STOP' = 'WS_CONNECTION_STOP';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

type TWsConnectionStart = {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
};

type TWsConnectionStop = {
    readonly type: typeof WS_CONNECTION_STOP;
};

type TWsConnectionSuccess = {
    readonly type: typeof WS_CONNECTION_SUCCESS;
};

type TWsConnectionError = {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string;
};

type TWsConnectionClosed = {
    readonly type: typeof WS_CONNECTION_CLOSED;
};

type TWsGetMessage = {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: {
        success: boolean;
        total: number;
        totalToday: number;
        orders: Array<TWSOrder>;
    }
};

type TWsSendMessage = {
    readonly type: typeof WS_SEND_MESSAGE;
};

export type TWsActions =
    TWsConnectionStart |
    TWsConnectionStop |
    TWsConnectionSuccess |
    TWsConnectionError |
    TWsConnectionClosed |
    TWsGetMessage |
    TWsSendMessage;
