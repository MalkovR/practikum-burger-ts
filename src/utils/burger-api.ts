import {
  FORGOT_PASSWORD_URL,
  INGREDIENTS_URL,
  LOGIN_URL,
  LOGOUT_URL,
  ORDER_URL,
  REGISTER_URL,
  RENEW_TOKEN_URL,
  RESET_PASSWORD_URL,
  USER_URL,
  HTTPS_URL_BASE,
} from "../const";
import {TUser} from "../types/common.ts";

// общие проверки

const checkFetchResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => {
        if (err.message || err.error) {
          return err;
        } else {
          return Promise.reject(err);
        }
      });
};

const checkJsonSuccess = (data: any) => {
  return data && data.success
    ? data
    : data && data.message
      ? Promise.reject(new Error(data.message || data.error))
      : Promise.reject("Failed to parse server response");
};

// получение ингредиентов

export const getIngredientData = () => {
  return fetch(INGREDIENTS_URL).then(checkFetchResponse).then(checkJsonSuccess);
};

// разместить заказ

const orderPostOptions = (ids: Array<string>, accessToken: string) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
    body: JSON.stringify({ ingredients: ids }),
  };
};

export const getOrderData = (ingredient_ids: Array<string>, accessToken: string) => {
    return fetch(ORDER_URL, orderPostOptions(ingredient_ids, accessToken))
      .then(checkFetchResponse)
      .then(checkJsonSuccess);
};

// авторизация

const loginPostOptions = ({ email, password }: Omit<TUser, "name">) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
};

export const loginRequest = ({ email, password }: Omit<TUser, "name">) => {
  return fetch(LOGIN_URL, loginPostOptions({ email, password }))
    .then(checkFetchResponse)
    .then(checkJsonSuccess);
};

// регистрация

const registerPostOptions = ({ email, password, name }: TUser) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  };
};

export const registerRequest = ({ email, password, name }: TUser) => {
  return fetch(REGISTER_URL, registerPostOptions({ email, password, name }))
    .then(checkFetchResponse)
    .then(checkJsonSuccess);
};

// выход

const logoutPostOptions = (refreshToken: string) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken }),
  };
};

export const logoutRequest = (refreshToken: string) => {
  return fetch(LOGOUT_URL, logoutPostOptions(refreshToken))
    .then(checkFetchResponse)
    .then(checkJsonSuccess);
};

// обновление токена

const renewTokenPostOptions = (refreshToken: string) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken }),
  };
};

export const renewTokenRequest = (refreshToken: string) => {
  return fetch(RENEW_TOKEN_URL, renewTokenPostOptions(refreshToken))
    .then(checkFetchResponse)
    .then(checkJsonSuccess);
};

// информация о пользователе

const getUserOptions = (accessToken: string) => {
  return {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
  };
};

export const getUserRequest = (accessToken: string) => {
  return fetch(USER_URL, getUserOptions(accessToken))
    .then(checkFetchResponse)
    .then(checkJsonSuccess);
};

// редактировать пользователя

const patchUserEditOptions = ({
  accessToken,
  email,
  password,
  name,
}: TUser & { accessToken: string }) => {
  return {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  };
};

export const editUserRequest = ({
  accessToken,
  email,
  password,
  name,
}: TUser & { accessToken: string }) => {
  return fetch(
    USER_URL,
    patchUserEditOptions({ accessToken, email, password, name }),
  )
    .then(checkFetchResponse)
    .then(checkJsonSuccess);
};

// Восстановить пароль

const forgotPasswordPostOptions = (email: string) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
};

export const forgotPasswordRequest = (email: string) => {
  return fetch(FORGOT_PASSWORD_URL, forgotPasswordPostOptions(email))
    .then(checkFetchResponse)
    .then(checkJsonSuccess);
};

// Сбросить пароль

const resetPasswordPostOptions = (
  password: string,
  token: string,
) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, token }),
  };
};

export const resetPasswordRequest = (
  password: string,
  token: string,
) => {
  return fetch(RESET_PASSWORD_URL, resetPasswordPostOptions(password, token))
    .then(checkFetchResponse)
    .then(checkJsonSuccess);
};

export const getFeedOrder = (orderNumber: string) => {
  return fetch(HTTPS_URL_BASE + `/${orderNumber}`)
      .then(checkFetchResponse)
      .then(checkJsonSuccess);
}
