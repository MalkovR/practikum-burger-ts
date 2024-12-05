import {RootState} from "../store.ts";

export const getWsOrders = (state: RootState) => state.feed.messages?.orders;
export const getWsOrdersTotal = (state: RootState) => state.feed.messages?.total;
export const getWsOrdersTotalToday = (state: RootState) => state.feed.messages?.totalToday;