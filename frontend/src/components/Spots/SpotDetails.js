import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { singleSpot } from "../../store/spot"
import * as reviewActions from '../../store/review';
import EditSpotForm from "./EditSpotFrom";
import DeleteSpotForm from "./DeleteSpotForm";
import AddReviewForm from "../Reviews/AddReviewForm";

const SpotDetails = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots);
    console.log('Spot: ', spot)
    const [edit, setEdit] = useState(false);
    const [deletePage, setDeletePage] = useState(false);
    const [addReview, setAddReview] = useState(false);
    
    const session = useSelector(state => state.session)
    let user;
    if(session.user) user = session.user

    let reviews = useSelector(state => state.review);

    let avgRating;
    let reviewers = [];
    if(reviews) {
        console.log(reviews)
        let stars = [...Object.values(reviews).map(review => review.stars)]
        let total;
        if(stars.length)total = stars.reduce((acc, cur) => acc + cur)
        avgRating = total / Object.keys(reviews).length;

        reviewers = Object.values(reviews).map(review => review.userId);
        console.log('Reviewers: ', reviewers)
    }

    useEffect(() => {
        dispatch(singleSpot(spotId));
        dispatch(reviewActions.spotReviews(spotId));
    }, [dispatch, spotId, addReview])

    return (
        <>
        <div className='details'>
        {spot && reviews && spot.User &&  (
        <>  
            <h2>{spot.name} - {spot.description}</h2>
            <div className="info">
                <p>★{avgRating || 5} · {Object.keys(reviews).length} reviews · {spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div class='images'>
                <img className="previewImage"/>
                <span className="otherImages">
                    <img />
                    <img />
                    <img />
                    <img />
                </span>
            </div>
            <div style={{position: 'relative'}}>
            <h3>House hosted by {spot.User.firstName}</h3>
            <h4 style= {{position: 'absolute', top: '-20px', right: 0}}>Price: ${spot.price} night</h4>
            </div>

        </>)}
        {reviews && (
            <>
            <h3>★{avgRating || 5} · {Object.keys(reviews).length} reviews</h3>
            <ul>
                {Object.keys(reviews).map(id => (
                    <li key={id}>
                        <h4>{`${reviews[id].User.firstName} ${reviews[id].User.lastName}`}</h4>
                        {`${reviews[id].stars} Stars: ${reviews[id].review}`}</li>
                ))}
            </ul>
            </>
        )}
        {spot && user && user.user.id === spot.ownerId &&
        (<>
            <button onClick={() => setEdit(!edit)}>Edit</button>
            {edit && (
                <EditSpotForm isOpen={edit} setOpen={setEdit} spot={spot}/>
            )}
            <button onClick={() => setDeletePage(!deletePage)}>Delete</button>
            {deletePage && (
                <DeleteSpotForm isOpen={deletePage} setOpen={setDeletePage} spot={spot}/>
            )}
        </>
        )}
        {spot && user && user.user.id !== spot.ownerId && !reviewers.includes(user.user.id) && (
            <>
                <button onClick={() => setAddReview(!addReview)}>Add Review</button>
                {addReview && (
                    <AddReviewForm isOpen={addReview} setOpen={setAddReview} spotId={spotId} />
                )}
            </>
        )}
        </div>
        </>
    )
}

export default SpotDetails;
