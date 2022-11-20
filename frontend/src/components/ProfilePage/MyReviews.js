import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink} from "react-router-dom"
import * as reviewActions from '../../store/review'
import DeleteReviewForm from "../Reviews/DeleteReviewForm"
import EditReviewForm from "../Reviews/EditReviewForm"

const MyReviews = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review)
    const [edit, setEdit] = useState(false);
    const [deleteReview, setDeleteReview] = useState(false)
    useEffect(() => {
        dispatch(reviewActions.userReviews())
    }, [dispatch, edit, deleteReview])
    
    

    return(
        <>
            {reviews && (
                Object.keys(reviews).map(id => {
                    if(reviews[id].Spot){ return(
                    <li key={id}><NavLink to={`${reviews[id].spotId}`}>{reviews[id].Spot.name}</NavLink>: {reviews[id].review} 
                    <p>Stars: {reviews[id].stars}</p>
                        <button onClick={() => setEdit(!edit)}>Edit Review</button>
                        {edit && (
                            <EditReviewForm isOpen={edit} setOpen={setEdit} currentReview={reviews[id]}/>
                        )}
                        <button onClick={() => setDeleteReview(!deleteReview)}>Delete Review</button>
                        {deleteReview && (
                            <DeleteReviewForm isOpen={deleteReview} setOpen={setDeleteReview} reviewId={id} />
                        )}
                    </li>
                )
            }
            else return 0;
        })
            )}
        </>
    )
}

export default MyReviews
