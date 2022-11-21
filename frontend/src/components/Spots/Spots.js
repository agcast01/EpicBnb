import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import * as spotActions from '../../store/spot'
import './Spots.css'
import spot1 from '../../images/spot-1.jpg'
import spot2 from '../../images/spot-2.jpg'
import spot3 from '../../images/spot-3.jpg'
import spot4 from '../../images/spot-4.jpg'
import spot5 from '../../images/spot-5.png'

const images = [spot1, spot2, spot3, spot4, spot5]
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
                    <div className="imageCard">
                        
                        {(images[spotId - 1] && (<img src={images[spotId - 1] || 'unkown'}/>))
                            || (<i className="fa-solid fa-house" />)
                        }
                    </div>
                    <div>
                    <span className="location">{`${spots[spotId].city}, ${spots[spotId].state}`}</span>
                    <span className="rating">★ {avgRating || 5}</span>
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
