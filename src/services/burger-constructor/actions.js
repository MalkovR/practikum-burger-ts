import { v4 as uuid } from 'uuid'

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';


export const addIngredient = (data) => (dispatch) => {
    return dispatch({
        type: ADD_INGREDIENT,
        payload: {...data, uuid: uuid()}
    })
}

export const removeIngredient = (uuid) => (dispatch) => {
    return dispatch({
        type: REMOVE_INGREDIENT,
        payload: uuid
    })
}

export const addBun = (data) => (dispatch) => {
    return dispatch({
        type: ADD_BUN,
        payload: data
    })
}

export const resetConstructor = () => {
    return {
        type: RESET_CONSTRUCTOR,
    }
}