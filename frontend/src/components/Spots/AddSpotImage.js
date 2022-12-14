import {useState} from 'react';
import { addSpotImage } from '../../store/spot';
import {useDispatch} from 'react-redux'

const AddSpotImage = ({spot, setModal, setImageShown}) => {
    const dispatch = useDispatch();

    console.log(spot)

    const [url, setUrl] = useState('');
    
    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(addSpotImage(spot, url))

        setImageShown(-1);

        return setModal('');
    }
    return (
        <>  
        <div className='modal_background'></div>
            <div className='modal'>
                <h2>Add Spot Image</h2>
                <form onSubmit={onSubmit}>
                    <label>Image URL
                    <input type='url' value={url} onChange={e => setUrl(e.target.value)}></input>
                    </label>
                    <button type='submit'>Add URL</button>
                    <button onClick={() => {setModal(''); setImageShown(-1);}}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default AddSpotImage
