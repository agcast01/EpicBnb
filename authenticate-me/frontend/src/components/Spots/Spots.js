import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import * as spotActions from '../../store/spot'
import './Spots.css'
const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots)

    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(spotActions.load())
    }, [dispatch])
    return (
        <>
        <ul>
            {spots && !spots.id && Object.keys(spots).map(spotId => (
                <li key={spotId}><NavLink to={`/${spotId}`} className="spots">{spots[spotId].name}</NavLink></li>
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
