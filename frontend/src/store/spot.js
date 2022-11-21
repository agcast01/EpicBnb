import { csrfFetch } from "./csrf";

const LOAD = '/spots/LOAD';
const CREATE = '/spots/CREATE';
const DELETE = '/spots/DELETE'

const loadSpots = (spots) => {
    return {
        type: LOAD,
        spots
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE,
        spotId
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
        newSpot.Reviews = [];
        dispatch(createSpot(newSpot));
        return response;
    }
}

export const edit = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`,{
        method: 'PUT',
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

export const userSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`);
    if(response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
        return response
    }
}

export const singleSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if(response.ok) {
        const spot = await response.json();
        dispatch(loadSpots(spot));
        return response
    }
};

export const deleteSingle = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if(response.ok) {
        dispatch(deleteSpot(spotId));
        return response;
    }
}

const spotReducer = (state = null, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD:
            if(action.spots.Spots) {
                return {...action.spots.Spots}
            }else{
                let single = {};
                single[action.spots.id] = action.spots
                return  single;
            }

        case CREATE:
            newState[action.spot.id] = action.spot
            return newState;
        case DELETE:
            delete newState[action.spotId]
            return newState;
        default:
            return state;
    }
}

export default spotReducer
