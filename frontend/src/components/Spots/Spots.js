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
                let ratings = [];
                let avgRating;
                if(spots[Object.keys(spots)[0]].Reviews){
                 ratings = Object.values(spots[spotId].Reviews).map(review => review.stars)
            }
                if(ratings.length) avgRating = ratings.reduce((acc, curr) => acc + curr) / ratings.length;
                return (
                <li key={spotId} onClick={() => history.push(`/${spotId}`)} className="listing">
                    <div className="imageCard" >
                        
                        <img src={spots[spotId].previewImage}/>
                        
                    </div>
                    <div>
                    <span className="location">{`${spots[spotId].city}, ${spots[spotId].state}`}</span>
                    <span className="rating">★ {avgRating || 0}</span>
                    </div>
                    <p>Added {weeks} weeks ago</p>
                    <p><span className="price">${spots[spotId].price}</span> night</p>
                </li>
            )})}
        </ul>
        </>
    )
}

export default Spots
