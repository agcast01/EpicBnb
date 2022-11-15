import { csrfFetch } from "./csrf";


const userReducer = (state, action) => {
    const newState = {...state}
    switch (action.type) {
        case SIGNUP:
            newState.user =  action.user;
            return newState;
        default:
            return state;
    }
}

export default userReducer;
