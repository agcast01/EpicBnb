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

    useEffect(() => {
        dispatch(singleSpot(spotId));
        dispatch(reviewActions.spotReviews(spotId));
    }, [dispatch, spotId, addReview])

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
        {reviews && (
            <ul>
                {Object.keys(reviews).map(id => (
                    <li key={id}>
                        <h4>{`${reviews[id].User.firstName} ${reviews[id].User.lastName}`}</h4>
                        {`${reviews[id].stars} Stars: ${reviews[id].review}`}</li>
                ))}
            </ul>
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
        {spot && user && user.user.id !== spot.ownerId && (
            <>
                <button onClick={() => setAddReview(!addReview)}>Add Review</button>
                {addReview && (
                    <AddReviewForm isOpen={addReview} setOpen={setAddReview} spotId={spotId} />
                )}
            </>
        )}
        </>
    )
}

export default SpotDetails;
