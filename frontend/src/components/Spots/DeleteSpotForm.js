import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { singleSpot, deleteSingle } from "../../store/spot"

const DeleteSpotForm = ({ spot, isOpen, setOpen }) => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const history = useHistory()
    useEffect(() => {
        dispatch(singleSpot(spotId))
    }, [dispatch, spotId])

    const [confirmation, setConfirmation] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        if (confirmation !== spot.name) {
            alert('Confirmation must match the name of the spot you wish to delete.')
        } else {
            dispatch(deleteSingle(spotId))
            history.push('/')
        }
    }

    return (
        <>
            <div className="modal_background"/>
            <form onSubmit={onSubmit} className="modal">
                <h3>Do you really want to delete {spot.name}?</h3>
                <p>If so please confirm by typing in {spot.name}.</p>
                <input placeholder={spot.name} value={confirmation} onChange={e => setConfirmation(e.target.value)} />
                <button type="submit">Delete</button>
                <button onClick={() => setOpen(!isOpen)}>Cancel</button>
            </form>
        </>
    )
}

export default DeleteSpotForm
