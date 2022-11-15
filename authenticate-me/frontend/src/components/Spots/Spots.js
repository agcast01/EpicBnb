import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import * as spotActions from '../../store/spot'
const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots)
    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(spotActions.load())
    }, [dispatch])
    return (
        <>
        <ul>
            {spots && spots.map(spot => (
                <li key={spot.id}>{spot.name}</li>
            ))}
        </ul>
        {sessionUser && (
            <>
            <NavLink to='/mySpots'>MySpots</NavLink>
            <NavLink to='/addSpot'>
                NewSpot
            </NavLink>
            </>
        )}
        </>
    )
}

export default Spots
