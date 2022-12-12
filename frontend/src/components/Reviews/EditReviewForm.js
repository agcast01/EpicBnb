import { useState } from "react";
import { useDispatch } from "react-redux";
import * as reviewActions from '../../store/review'

const EditReviewForm = ({setOpen, isOpen, currentReview}) => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0)
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            review,
            stars
        }

        dispatch(reviewActions.edit(newReview, currentReview.id))
        setOpen(!isOpen)
    }
    return(
        <>  
            <div className="modal_background" />
            <form onSubmit={onSubmit} className="modal">
                <label>Review
                <input
                type='text'
                placeholder="Review"
                value={review || currentReview.review}
                onChange={(e) => setReview(e.target.value)}
                /></label>
                <label>Stars
                <input type='number'
                    min='1'
                    max='5'
                    value={stars || currentReview.stars}
                    onChange={(e) => setStars(e.target.value)}
                /></label>
                <button type='submit'>Submit</button>
                <button onClick={() => setOpen(!isOpen)}>Cancel</button>
            </form>
        </>
    )
}

export default EditReviewForm
