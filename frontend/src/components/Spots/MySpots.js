import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userSpots } from "../../store/spot";
const MySpots = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userSpots())
    }, [dispatch])

    const spots = useSelector(state => state.spots)
    return(
        <>
        <ul>
            {spots && Object.keys(spots).map(id => (
                <li key={spots[id]}><NavLink to={`/${spots[id].id}`}>{spots[id].name}</NavLink></li>
            ))}
        </ul>
            
        </>
    )
}
export default MySpots;
