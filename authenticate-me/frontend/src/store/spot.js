import { csrfFetch } from "./csrf";

const LOAD = '/spots/LOAD';

const loadSpots = (spots) => {
    return {
        type: LOAD,
        spots
    }
}
export const load = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    if(response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
        return response;
    }
}

const CREATE = '/spots.CREATE';

const createSpot = (spot) => {
    return {
        type: CREATE,
        spot
    }
}

export const create = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });

    if(response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot));
        return response;
    }
}

const spotReducer = (state = {spots: null}, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD:
            newState.spots= [...action.spots.Spots];
            return newState;
        case CREATE:
            newState.spots = [...state.spots, action.spot];
            return newState;
        default:
            return state;
    }
}

export default spotReducer
