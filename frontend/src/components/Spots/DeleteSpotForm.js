import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { singleSpot, deleteSingle } from "../../store/spot"

const DeleteSpotForm = () => {
    const dispatch = useDispatch()
    const {spotId} = useParams()
    const history = useHistory()
    useEffect(() => {
        dispatch(singleSpot(spotId))
    }, [dispatch])
    const spot = useSelector(state => state.spots);

    const [confirmation, setConfirmation] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        if(confirmation !== spot.name) {
            alert('Confirmation must match the name of the spot you wish to delete.')
        } else {
            dispatch(deleteSingle(spotId))
            history.push('/')
        }
    }

    return (
        <>
            {spot && (
                <>
                <h3>Do you really want to delete {spot.name}?</h3>
                <p>If so please confirm by typing in {spot.name}.</p>
                <form onSubmit={onSubmit}>
                    <input placeholder={spot.name} value={confirmation} onChange={e => setConfirmation(e.target.value)}/>
                    <button type="submit">Delete</button>
                </form>
                </>
            )}
        </>
    )
}

export default DeleteSpotForm
