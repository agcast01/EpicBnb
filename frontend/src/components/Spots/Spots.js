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
            {spots && !spots.id && Object.keys(spots).map(spotId => (
                <li key={spotId} onClick={() => history.push(`/${spotId}`)} className="listing">
                    <div className='imageCard'></div>
                    <p className="location">{`${spots[spotId].city}, ${spots[spotId].state}`}</p>
                    <p><span className="price">${spots[spotId].price}</span> night</p>
                </li>
            ))}
        </ul>
        </>
    )
}

export default Spots
