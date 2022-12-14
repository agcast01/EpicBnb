import { csrfFetch } from "./csrf"

const LOGIN = "session/LOGIN"

const login = (user) => {
    return {
        type: LOGIN,
        user
    }
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('api/session');
    const data = await response.json();
    if(data.user){
        dispatch(login(data));
        return data;
    }
}

export const loginUser = (user) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if(response.ok){ 
        const data = await response.json();
        dispatch(login(data));
        return response;
    }
    const error = await response.json();
    return error;
}

const SIGNUP = '/users/signup';

const signup = (user) => {
    return {
        type: SIGNUP,
        user
    }
}

export const userSignUp = (user) => async dispatch => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if(response.ok) {
        const newUser = await response.json();
        dispatch(signup(newUser));
        return response;
    }

    const error = await response.json();
    console.log(error);
}

const LOGOUT = '/session/SIGNOUT';

const logout = () => {
    return {
        type: LOGOUT
    }
}

export const logoutUser = () => async dispatch => {
    const response = await csrfFetch('/api/session',{
        method: 'DELETE'
    });

    if(response.ok) {
        dispatch(logout());
        return response;
    }
}

const sessionReducer = (state = {user: null}, action) => {
    let newState = {}
    switch (action.type) {
        case LOGIN:
            newState.user = action.user;
            if(action.user) return newState
            return state
        case LOGOUT:
            return {user: null}
        case SIGNUP:
            newState.user = action.user;
            return newState;
        default:
            return state
    }
}

export default sessionReducer;
