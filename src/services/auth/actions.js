import {
    editUserRequest,
    getUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
    renewTokenRequest,
} from "../../utils/burger-api";

import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";

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
    dispatch(userProfileRequest());
    let accessToken = getCookie("accessToken");

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
            deleteCookie("accessToken");
            dispatch(userProfileErrorRequest());
          }
        });
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
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("accessToken", accessToken, {});
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(userRegisterSuccessRequest(res.user));
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

    const refreshToken = localStorage.getItem("refreshToken");
    renewTokenRequest(refreshToken)
      .then((res) => {
        // deleteCookie("accessToken");
        // localStorage.removeItem("refreshToken");
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("accessToken", accessToken, {});
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(userRenewTokenSuccessRequest());
      })
      .catch((error) => {
        dispatch(userRenewTokenErrorRequest(error));
      });
  };
};

export const renewTokens = () => {
  const refreshToken = localStorage.getItem("refreshToken");

  return renewTokenRequest(refreshToken)
    .then((res) => {
      const accessToken = res.accessToken.split("Bearer ")[1];
      const refreshToken = res.refreshToken;

      setCookie("accessToken", accessToken, {});
      localStorage.setItem("refreshToken", refreshToken);
    })
    .catch((error) => {
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
    });
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
        localStorage.setItem("refreshToken", refreshToken);
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

    const refreshToken = localStorage.getItem("refreshToken");
    logoutRequest(refreshToken)
      .then(() => {
        dispatch(userLogoutSuccessRequest());
        localStorage.removeItem("refreshToken");
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
          dispatch(renewToken());
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

const userUpdateProfileSuccessRequest = (user) => ({
  type: USER_UPDATE_PROFILE_SUCCESS,
  payload: user,
});

export const editUser = ({ email, password, name }) => {
  return (dispatch) => {
    dispatch(userUpdateProfileRequest());

    const accessToken = "Bearer " + getCookie("accessToken");
    editUserRequest(accessToken, email, password, name)
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
          dispatch(userUpdateProfileErrorRequest());
        }
      });
  };
};
