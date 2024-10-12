import { getIngredientData } from "../../utils/burger-api"


export const INGREDIENTS_LOADING = 'INGREDIENTS_LOADING';
export const INGREDIENTS_LOAD_ERROR = 'INGREDIENTS_LOAD_ERROR';
export const INGREDIENTS_LOAD_SUCCESS = 'INGREDIENTS_LOAD_SUCCESS';

export const getIngredients = () => (dispatch) => {
    dispatch({type: INGREDIENTS_LOADING});

    return getIngredientData()
        .then((res) => {
            dispatch({
                type: INGREDIENTS_LOAD_SUCCESS,
                payload: res
            });
        })
        .catch(error => {
            dispatch({
                type: INGREDIENTS_LOAD_ERROR,
                payload: error.message
            });
        })
};