// import {SET_USER} from "./actions";

const initialState = {
    bun: null,
    ingredients: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    //     case SET_USER:
    //         return {
    //             ...state,
    //             user: action.payload,
    //         }
        default:
            return state;
    }
}