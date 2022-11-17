import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { singleSpot } from "../../store/spot"

const SpotDetails = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots);
    
    const session = useSelector(state => state.session)
    let user;
    if(session.user) user = session.user
    const history = useHistory();
    console.log('User: ', user)
    console.log('Spot: ', spot)
    useEffect(() => {
        dispatch(singleSpot(spotId));
    }, [dispatch])
    return (
        <>
        {spot && (
        <>
            <h2>{spot.name}</h2>
            <p>Description: {spot.description}</p>
            <p>Price: ${spot.price}</p>
            <p>Address: {spot.address}</p>
            <p>City: {spot.city} </p>
            <p>State: {spot.state}</p>
            <p>Country: {spot.country}</p>
        </>)}
        {spot && user && user.user.id === spot.ownerId &&
        (<>
            <button onClick={() => history.push(`/editSpot/${spotId}`)}>Edit</button>
            <button onClick={() => history.push(`/deleteSpot/${spotId}`)}>Delete</button>
        </>
        )}
        </>
    )
}

export default SpotDetails;
