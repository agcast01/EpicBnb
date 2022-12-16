import { csrfFetch } from "./csrf";

const LOAD = 'review/LOAD';
const CREATE = 'review/CREATE';
const DELETE = 'review/DELETE';

const loadReviews = (reviews) => {
    return {
        type: LOAD,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE,
        reviewId
    }
}

export const userReviews = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current');
    if(response.ok) {
        const data = await response.json();
        const reviews = {};
        data.forEach(review => {reviews[review.id] = review});
        dispatch(loadReviews(reviews));
        return response;
    }
}

export const spotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if(response.ok) {
        const data = await response.json();
        const reviews = {};
        data.Reviews.forEach(review => {reviews[review.id] = review});
        dispatch(loadReviews(reviews));
        return response;
    }
}

export const create = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(createReview(data));
        return response;
    }
    throw new Error('review exists')
}

export const edit = (review, id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    if(response.ok) {
        const review = await response.json();
        dispatch(createReview(review))
        return review
    }
}

export const remove = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${Number(reviewId)}`, {
        method: 'DELETE',
    });

    if(response.ok) {
        dispatch(deleteReview(Number(reviewId)))
        return 'success';
    }
}


const reviewReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD:
            return action.reviews;
        case CREATE:
            newState[action.review.id] = action.review;
            return newState;
        case DELETE:
            newState = {...state};
            delete newState[action.reviewId]
            console.log('Delete State:', newState)
            return newState;
        default:
            return state;
    }
}

export default reviewReducer
