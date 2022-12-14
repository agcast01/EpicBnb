import {useDispatch} from 'react-redux'
import { deleteSpotImage } from '../../store/spot';

const DeleteSpotImage = ({imageId, slot, spot, setModal, setImageShown}) => {

    const dispatch = useDispatch();

    console.log('Image Id:', imageId)

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(deleteSpotImage(imageId, slot, spot));

        setImageShown(-1);

        return setModal('');
    }

    return (
        <>
        <div className="modal_background" />
        <div className="modal">
            <h2>Delete Image</h2>
            <form onSubmit={onSubmit} style={{border: 'none'}}>
                <button type='submit'>Yes</button>
                <button onClick={() => {setModal(''); setImageShown(-1);}}>No</button>
            </form>
        </div>
        </>
    )
}

export default DeleteSpotImage;
