import {
  loginRequest,
  logoutRequest,
  registerRequest,
  renewTokenRequest,
  getUserRequest,
  editUserRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../../utils/burger-api";

import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export const USER_PROFILE_REQUEST = "USER_PROFILE_REQUEST";
export const USER_PROFILE_ERROR = "USER_PROFILE_ERROR";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";

export const USER_UPDATE_PROFILE_REQUEST = "USER_UPDATE_PROFILE_REQUEST";
export const USER_UPDATE_PROFILE_ERROR = "USER_UPDATE_PROFILE_ERROR";
export const USER_UPDATE_PROFILE_SUCCESS = "USER_UPDATE_PROFILE_SUCCESS";

export const USER_RENEW_TOKEN_REQUEST = "USER_RENEW_TOKEN_REQUEST";
export const USER_RENEW_TOKEN_ERROR = "USER_RENEW_TOKEN_ERROR";
export const USER_RENEW_TOKEN_SUCCESS = "USER_RENEW_TOKEN_SUCCESS";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const checkUserAuth = () => {
  return (dispatch) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      getUserRequest(accessToken)
        .catch(() => {
          deleteCookie("refreshToken");
          deleteCookie("accessToken");
          dispatch(userLogoutSuccessRequest());
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

// Регистрация

const userRegisterRequest = () => ({
  type: USER_REGISTER_REQUEST,
});

const userRegisterErrorRequest = (error) => ({
  type: USER_REGISTER_ERROR,
  payload: error,
});

const userRegisterSuccessRequest = (user) => ({
  type: USER_REGISTER_SUCCESS,
  payload: user,
});

export const register = ({ email, password, name }) => {
  return (dispatch) => {
    dispatch(userRegisterRequest());
    registerRequest(email, password, name)
      .then((res) => {
        dispatch(userRegisterSuccessRequest(res.user));
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("accessToken", accessToken, {});
        setCookie("refreshToken", refreshToken, {});
      })
      .catch((error) => {
        dispatch(userRegisterErrorRequest(error));
      });
  };
};

// Обновление токена

const userRenewTokenRequest = () => ({
  type: USER_RENEW_TOKEN_REQUEST,
});

const userRenewTokenErrorRequest = (error) => ({
  type: USER_RENEW_TOKEN_ERROR,
  payload: error,
});

const userRenewTokenSuccessRequest = () => ({
  type: USER_RENEW_TOKEN_SUCCESS,
});

export const renewToken = () => {
  return (dispatch) => {
    dispatch(userRenewTokenRequest());

    const refreshToken = getCookie("refreshToken");
    renewTokenRequest(refreshToken)
      .then((res) => {
        dispatch(userRenewTokenSuccessRequest());
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("accessToken", accessToken, {});
        setCookie("refreshToken", refreshToken, {});
      })
      .catch((error) => {
        dispatch(userRenewTokenErrorRequest(error));
      });
  };
};

// Авторизация

const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

const userLoginErrorRequest = (error) => ({
  type: USER_LOGIN_ERROR,
  payload: error,
});

const userLoginSuccessRequest = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});

export const login = ({ email, password }) => {
  return (dispatch) => {
    dispatch(userLoginRequest());
    loginRequest(email, password)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("accessToken", accessToken, {});
        setCookie("refreshToken", refreshToken, {});
        dispatch(userLoginSuccessRequest(res.user));
      })
      .catch((error) => {
        dispatch(userLoginErrorRequest(error));
      });
  };
};

// Выход

const userLogoutRequest = () => ({
  type: USER_LOGOUT_REQUEST,
});

const userLogoutErrorRequest = (error) => ({
  type: USER_LOGOUT_ERROR,
  payload: error,
});

const userLogoutSuccessRequest = () => ({
  type: USER_LOGOUT_SUCCESS,
});

export const logout = () => {
  return (dispatch) => {
    dispatch(userLogoutRequest());

    const refreshToken = getCookie("refreshToken");
    logoutRequest(refreshToken)
      .then(() => {
        dispatch(userLogoutSuccessRequest());
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      })
      .catch((error) => {
        dispatch(userLogoutErrorRequest(error));
      });
  };
};

// Информация о пользователе

const userProfileRequest = () => ({
  type: USER_PROFILE_REQUEST,
});

const userProfileErrorRequest = (error) => ({
  type: USER_PROFILE_ERROR,
  payload: error,
});

const userProfileSuccessRequest = (user) => ({
  type: USER_PROFILE_SUCCESS,
  payload: user,
});

export const profile = () => {
  return (dispatch) => {
    dispatch(userProfileRequest());

    const accessToken = "Bearer " + getCookie("accessToken");
    getUserRequest(accessToken)
      .then((res) => {
        dispatch(userProfileSuccessRequest(res.user));
      })
      .catch((error) => {
        if (error.message === "jwt expired") {
          renewToken();
          dispatch(profile());
        } else {
          dispatch(userProfileErrorRequest(error));
        }
      });
  };
};

// Редактировать пользователя

const userUpdateProfileRequest = () => ({
  type: USER_UPDATE_PROFILE_REQUEST,
});

const userUpdateProfileErrorRequest = (error) => ({
  type: USER_UPDATE_PROFILE_ERROR,
  payload: error,
});

const userUpdateProfileSuccessRequest = () => ({
  type: USER_UPDATE_PROFILE_SUCCESS,
});

export const editUser = ({ email, password, name }) => {
  return (dispatch) => {
    dispatch(userUpdateProfileRequest());

    const accessToken = "Bearer " + getCookie("accessToken");
    editUserRequest(accessToken, email, password, name)
      .then((res) => {
        dispatch(userUpdateProfileSuccessRequest(res.user));
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("accessToken", accessToken, {});
        setCookie("refreshToken", refreshToken, {});
      })
      .catch((error) => {
        if (error.message === "jwt expired") {
          renewToken();
        } else {
          dispatch(userUpdateProfileErrorRequest(error));
        }
      });
  };
};
