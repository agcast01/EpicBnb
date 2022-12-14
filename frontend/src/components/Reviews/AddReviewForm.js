import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from '../../store/review'

const AddReviewForm = ({setOpen, isOpen, spotId}) => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0)
    const dispatch = useDispatch()

    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            review,
            stars: Number(stars)
        }
        
        dispatch(reviewActions.create(newReview, spotId)) 
        setOpen(!isOpen)
        history.push(`/${spotId}`)
        return newReview;
    }
    return(
        <>  
            <div className="modal_background" />
            <div className='modal'>
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
                    /></label>
                    <button type='submit'>Submit</button>
                    <button onClick={() => setOpen(!isOpen)}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default AddReviewForm
