import {
    editUserRequest,
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
    renewTokenRequest,
} from "../../utils/burger-api";
import {AppThunk} from "../store.ts";
import {TUser} from "../../types/common.ts";

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";

export const USER_REGISTER_REQUEST: "USER_REGISTER_REQUEST" = "USER_REGISTER_REQUEST";
export const USER_REGISTER_ERROR: "USER_REGISTER_ERROR" = "USER_REGISTER_ERROR";
export const USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS" = "USER_REGISTER_SUCCESS";

export const USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST" = "USER_LOGIN_REQUEST";
export const USER_LOGIN_ERROR: "USER_LOGIN_ERROR" = "USER_LOGIN_ERROR";
export const USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS" = "USER_LOGIN_SUCCESS";

export const USER_LOGOUT_REQUEST: "USER_LOGOUT_REQUEST" = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_ERROR: "USER_LOGOUT_ERROR" = "USER_LOGOUT_ERROR";
export const USER_LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS" = "USER_LOGOUT_SUCCESS";

export const USER_PROFILE_REQUEST: "USER_PROFILE_REQUEST" = "USER_PROFILE_REQUEST";
export const USER_PROFILE_ERROR: "USER_PROFILE_ERROR" = "USER_PROFILE_ERROR";
export const USER_PROFILE_SUCCESS: "USER_PROFILE_SUCCESS" = "USER_PROFILE_SUCCESS";

export const USER_UPDATE_PROFILE_REQUEST: "USER_UPDATE_PROFILE_REQUEST" = "USER_UPDATE_PROFILE_REQUEST";
export const USER_UPDATE_PROFILE_ERROR: "USER_UPDATE_PROFILE_ERROR" = "USER_UPDATE_PROFILE_ERROR";
export const USER_UPDATE_PROFILE_SUCCESS: "USER_UPDATE_PROFILE_SUCCESS" = "USER_UPDATE_PROFILE_SUCCESS";

export const USER_RENEW_TOKEN_REQUEST: "USER_RENEW_TOKEN_REQUEST" = "USER_RENEW_TOKEN_REQUEST";
export const USER_RENEW_TOKEN_ERROR: "USER_RENEW_TOKEN_ERROR" = "USER_RENEW_TOKEN_ERROR";
export const USER_RENEW_TOKEN_SUCCESS: "USER_RENEW_TOKEN_SUCCESS" = "USER_RENEW_TOKEN_SUCCESS";


type TAuthChecked = {
    readonly type: typeof SET_AUTH_CHECKED;
    payload: boolean,
}
export const setAuthChecked: AppThunk = (value: boolean) => (dispatch) => {
    return dispatch({
        type: SET_AUTH_CHECKED,
        payload: value,
    });
}

export const checkUserAuth: AppThunk = () => {
  return (dispatch) => {
    dispatch(userProfileRequest());
    let accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
      accessToken = "Bearer " + accessToken;
      getUserRequest(accessToken)
        .then((res) => dispatch(userProfileSuccessRequest(res.user)))
        .catch((error) => {
          if (error.message === "jwt expired") {
              renewTokens().then(() => {
                  dispatch(checkUserAuth());
              });
          } else {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            dispatch(userProfileErrorRequest(error.message));
          }
        });
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

// Регистрация

type TUserRegisterRequest = {
    readonly type: typeof USER_REGISTER_REQUEST;
}
const userRegisterRequest: AppThunk = () => (dispatch) => {
    return dispatch({
        type: USER_REGISTER_REQUEST,
    });
}

type TUserRegisterErrorRequest = {
    readonly type: typeof USER_REGISTER_ERROR;
    payload: string;
}
const userRegisterErrorRequest: AppThunk = (error: string) => (dispatch) => {
    return dispatch({
        type: USER_REGISTER_ERROR,
        payload: error,
    });
}

type TUserRegisterSuccessRequest = {
    readonly type: typeof USER_REGISTER_SUCCESS;
    payload: TUser;
}
const userRegisterSuccessRequest: AppThunk = (user: TUser) => (dispatch) => {
    return dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: user,
    });
}

export const register: AppThunk = ({ email, password, name }) => {
  return (dispatch) => {
    dispatch(userRegisterRequest());
    registerRequest({email, password, name})
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(userRegisterSuccessRequest(res.user));
      })
      .catch((error) => {
        dispatch(userRegisterErrorRequest(error));
      });
  };
};

// Обновление токена

type TUserRenewTokenRequest = {
    readonly type: typeof USER_RENEW_TOKEN_REQUEST;
}
const userRenewTokenRequest: AppThunk = () => (dispatch) => {
    return dispatch({
        type: USER_RENEW_TOKEN_REQUEST,
    });
}

type TUserRenewTokenErrorRequest = {
    readonly type: typeof USER_RENEW_TOKEN_ERROR;
    payload: string;
}
const userRenewTokenErrorRequest: AppThunk = (error: string) => (dispatch) => {
    return dispatch({
        type: USER_RENEW_TOKEN_ERROR,
        payload: error,
    });
}

type TUserRenewTokenSuccessRequest = {
    readonly type: typeof USER_RENEW_TOKEN_SUCCESS;
}
const userRenewTokenSuccessRequest: AppThunk = () => (dispatch) => {
    return dispatch({
        type: USER_RENEW_TOKEN_SUCCESS,
    });
}

export const renewToken: AppThunk = () => {
  return (dispatch) => {
    dispatch(userRenewTokenRequest());

    const refreshToken = localStorage.getItem("refreshToken") || '';
    renewTokenRequest(refreshToken)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(userRenewTokenSuccessRequest());
      })
      .catch((error) => {
        dispatch(userRenewTokenErrorRequest(error));
      });
  };
};

export const renewTokens = () => {
  const refreshToken = localStorage.getItem("refreshToken") || '';

  return renewTokenRequest(refreshToken)
    .then((res) => {
      const accessToken = res.accessToken.split("Bearer ")[1];
      const refreshToken = res.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    })
    .catch((error) => {
        console.log(error)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    });
};

// Авторизация

type TUserLoginRequest = {
    readonly type: typeof USER_LOGIN_REQUEST;
}
const userLoginRequest: AppThunk = () => (dispatch) => {
    return dispatch({
        type: USER_LOGIN_REQUEST,
    });
}

type TUserLoginErrorRequest = {
    readonly type: typeof USER_LOGIN_ERROR;
    payload: string;
}
const userLoginErrorRequest: AppThunk = (error: string) => (dispatch) => {
    return dispatch({
        type: USER_LOGIN_ERROR,
        payload: error,
    });
}

type TUserLoginSuccessRequest = {
    readonly type: typeof USER_LOGIN_SUCCESS;
    payload: TUser;
}
const userLoginSuccessRequest: AppThunk = (user: TUser) => (dispatch) => {
    return dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user,
    });
}

export const login: AppThunk = ({ email, password }) => {
  return (dispatch) => {
    dispatch(userLoginRequest());
    loginRequest({email, password})
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(userLoginSuccessRequest(res.user));
      })
      .catch((error) => {
        dispatch(userLoginErrorRequest(error));
      });
  };
};

// Выход

type TUserLogoutRequest = {
    readonly type: typeof USER_LOGOUT_REQUEST;
}
const userLogoutRequest: AppThunk = () => (dispatch) => {
    return dispatch({
        type: USER_LOGOUT_REQUEST,
    });
}

type TUserLogoutErrorRequest = {
    readonly type: typeof USER_LOGOUT_ERROR;
    payload: string;
}
const userLogoutErrorRequest: AppThunk = (error: string) => (dispatch) => {
    return dispatch({
        type: USER_LOGOUT_ERROR,
        payload: error,
    });
}

type TUserLogoutSuccessRequest = {
    readonly type: typeof USER_LOGOUT_SUCCESS;
}
const userLogoutSuccessRequest: AppThunk = () => (dispatch) => {
    return dispatch({
        type: USER_LOGOUT_SUCCESS,
    });
}

export const logout: AppThunk = () => {
  return (dispatch) => {
    dispatch(userLogoutRequest());

    const refreshToken = localStorage.getItem("refreshToken") || '';
    logoutRequest(refreshToken)
      .then(() => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        dispatch(userLogoutSuccessRequest());
      })
      .catch((error) => {
        dispatch(userLogoutErrorRequest(error));
      });
  };
};

// Информация о пользователе

type TUserProfileRequest = {
    readonly type: typeof USER_PROFILE_REQUEST;
}
const userProfileRequest: AppThunk = () => (dispatch) => {
    return dispatch({
        type: USER_PROFILE_REQUEST,
    });
}

type TUserProfileErrorRequest = {
    readonly type: typeof USER_PROFILE_ERROR;
    payload: string;
}
const userProfileErrorRequest: AppThunk = (error: string) => (dispatch) => {
    return dispatch({
        type: USER_PROFILE_ERROR,
        payload: error,
    });
}

type TUserProfileSuccessRequest = {
    readonly type: typeof USER_PROFILE_SUCCESS;
    payload: TUser;
}
const userProfileSuccessRequest: AppThunk = (user: TUser) => (dispatch) => {
    return dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: user,
    });
}

export const profile: AppThunk = () => {
  return (dispatch) => {
    dispatch(userProfileRequest());

    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    getUserRequest(accessToken)
      .then((res) => {
        dispatch(userProfileSuccessRequest(res.user));
      })
      .catch((error) => {
        if (error.message === "jwt expired") {
          renewTokens()
              .then(() => {
                  dispatch(profile());
              });
        } else {
          dispatch(userProfileErrorRequest(error.message));
        }
      });
  };
};

// Редактировать пользователя

type TUserUpdateProfileRequest = {
    readonly type: typeof USER_UPDATE_PROFILE_REQUEST;
}
const userUpdateProfileRequest: AppThunk = () => (dispatch) => {
    return dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
    });
}

type TUserUpdateProfileErrorRequest = {
    readonly type: typeof USER_UPDATE_PROFILE_ERROR;
    payload: string;
}
const userUpdateProfileErrorRequest: AppThunk = (error: string) => (dispatch) => {
    return dispatch({
        type: USER_UPDATE_PROFILE_ERROR,
        payload: error,
    });
}

type TUserUpdateProfileSuccessRequest = {
    readonly type: typeof USER_UPDATE_PROFILE_SUCCESS;
    payload: TUser;
}
const userUpdateProfileSuccessRequest: AppThunk = (user: TUser) => (dispatch) => {
    return dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: user,
    });
}

export const editUser: AppThunk = ({ email, password, name }) => {
  return (dispatch) => {
    dispatch(userUpdateProfileRequest());

    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    editUserRequest({accessToken, email, password, name})
      .then((res) => {
        dispatch(userUpdateProfileSuccessRequest(res.user));
      })
      .catch((error) => {
        if (error.message === "jwt expired") {
            renewTokens().then(() => {
                dispatch(editUser({ email, password, name }));
            });
        } else {
          console.log(error);
          dispatch(userUpdateProfileErrorRequest(error.message));
        }
      });
  };
};

export type TAuthActions =
    TAuthChecked |
    TUserRegisterRequest |
    TUserRegisterErrorRequest |
    TUserRegisterSuccessRequest |
    TUserRenewTokenRequest |
    TUserRenewTokenErrorRequest |
    TUserRenewTokenSuccessRequest |
    TUserLoginRequest |
    TUserLoginErrorRequest |
    TUserLoginSuccessRequest |
    TUserLogoutRequest |
    TUserLogoutErrorRequest |
    TUserLogoutSuccessRequest |
    TUserProfileRequest |
    TUserProfileErrorRequest |
    TUserProfileSuccessRequest |
    TUserUpdateProfileRequest |
    TUserUpdateProfileErrorRequest |
    TUserUpdateProfileSuccessRequest