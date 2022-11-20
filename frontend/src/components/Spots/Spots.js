import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import * as spotActions from '../../store/spot'
import './Spots.css'
const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots)
    const history = useHistory();

    useEffect(() => {
        dispatch(spotActions.load())
    }, [dispatch])
    return (
        <>
        <ul className="spots">
            {spots && !spots.id && Object.keys(spots).map(spotId => {
                const createdAt = new Date(spots[spotId].createdAt).getTime()
                const today = new Date().getTime()
                const weeks = Math.round((today - createdAt) / 604800000)
                return (
                <li key={spotId} onClick={() => history.push(`/${spotId}`)} className="listing">
                    <img className='imageCard' source={spots[spotId].previewImage } alt={spots[spotId].name} />
                    <p className="location">{`${spots[spotId].city}, ${spots[spotId].state}`}</p>
                    <p>Added {weeks} weeks ago</p>
                    <p><span className="price">${spots[spotId].price}</span> night</p>
                </li>
            )})}
        </ul>
        </>
    )
}

export default Spots
