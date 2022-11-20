import { useState } from "react";
import { useDispatch } from "react-redux";
import * as reviewActions from '../../store/review'

const AddReviewForm = ({setOpen, isOpen, spotId}) => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0)
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            review,
            stars
        }
        
        dispatch(reviewActions.create(newReview, spotId)) 
        setOpen(!isOpen)
    }
    return(
        <>  
            <div className="modal_background" />
            <form onSubmit={onSubmit} className="modal">
                <label>Review</label>
                <textarea
                placeholder="Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                />
                <label>Stars</label>
                <input type='number'
                    min='0'
                    max='5'
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                />
                <button type='submit'>Submit</button>
                <button onClick={() => setOpen(!isOpen)}>Cancel</button>
            </form>
        </>
    )
}

export default AddReviewForm
