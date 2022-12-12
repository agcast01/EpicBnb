import { useDispatch } from "react-redux";
import * as reviewActions from '../../store/review'

const DeleteReviewForm = ({isOpen, setOpen, reviewId}) => {
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(reviewActions.remove(reviewId))
        setOpen(!isOpen)
    }   
    return (
        <>
        <div className="modal_background" />
        <div className='modal'>
        <form onSubmit={onSubmit}>
            <p>Are you sure you want to delete this review?</p>
            <div>
                <button type="submit">Yes</button>
                <button onClick={() => setOpen(!isOpen)}>No</button>
            </div>
        </form>
        </div>
        </>
    )
}

export default DeleteReviewForm;
