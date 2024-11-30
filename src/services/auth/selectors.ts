import {RootState} from "../store.ts";

export const getUserData = (state: RootState) => state.auth.user;
export const getUserAuthChecked = (state: RootState) => state.auth.isAuthChecked;
export const getIsUserLoaded = (state: RootState) => state.auth.isUserLoaded;
