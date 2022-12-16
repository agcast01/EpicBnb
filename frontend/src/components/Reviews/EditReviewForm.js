import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from '../../store/review'

const EditReviewForm = ({setOpen, isOpen, currentReview}) => {
    const [review, setReview] = useState(currentReview.review);
    const [stars, setStars] = useState(currentReview.stars)
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            review,
            stars: Number(stars)
        }

        dispatch(reviewActions.edit(newReview, currentReview.id))
        setOpen(!isOpen)
        history.push(`/${currentReview.spotId}`)
        return newReview;
    }
    return(
        <>  
            <div className="modal_background" />
            <div className="modal">
            <form onSubmit={onSubmit}>
                <label>Review
                <input
                type='text'
                value={review}
                onChange={(e) => setReview(e.target.value)}
                /></label>
                <label>Stars
                <input type='number'
                    min='1'
                    max='5'
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                /></label>
                <button type='submit'>Submit</button>
                <button onClick={() => setOpen(!isOpen)}>Cancel</button>
            </form>
            </div>
        </>
    )
}

export default EditReviewForm
