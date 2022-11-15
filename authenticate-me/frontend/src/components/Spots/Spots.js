import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as spotActions from '../../store/spot'
const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots)
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
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
        </>
    )
}

export default Spots
