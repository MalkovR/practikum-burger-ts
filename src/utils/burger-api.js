import { INGREDIENTS_URL, ORDER_URL } from "../const";

const checkFetchResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Server response error ${res.status}`);
};

const checkJsonSuccess = (data) => {
  return data && data.success
    ? data
    : Promise.reject("Failed to parse server response");
};

export const getIngredientData = () => {
  return fetch(INGREDIENTS_URL).then(checkFetchResponse).then(checkJsonSuccess);
};

const orderPostOptions = (ids) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ids }),
  };
};

export const getOrderData = (ingredient_ids) => {
  return fetch(ORDER_URL, orderPostOptions(ingredient_ids))
    .then(checkFetchResponse)
    .then(checkJsonSuccess);
};
