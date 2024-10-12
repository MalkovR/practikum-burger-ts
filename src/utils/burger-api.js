import { INGREDIENTS_URL } from "../const";


const checkFetchResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Server response error ${res.status}`)
};

const checkJsonSuccess = (data) => {
    return data && data.success ? data : Promise.reject("Failed to parse server response")
};

export const getIngredientData = () => {
      return fetch(INGREDIENTS_URL)
          .then(checkFetchResponse)
          .then(checkJsonSuccess)
}
