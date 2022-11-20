/* {
    "address": "123 Disney Lane",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "App Academy",
    "description": "Place where web developers are created",
    "price": 123
  } */

import { useEffect, useState} from "react";
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from "react-redux";

const CreateSpotForm = ({isOpen, setOpen}) => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [previewImage, setPreviewImage] = useState('')
    const user = useSelector(state => state.session)

    const disabled = Boolean(!user.user);    

    console.log('Disabled: ', disabled)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        dispatch(spotActions.create(payload))
        setOpen(!isOpen)
    }
    return (
        <>  
            
            <div className="modal_background" />
            <form onSubmit={handleSubmit} className="modal">
                <label>Address
                <input
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                /></label>
                <label>City
                <input
                required
                value={city}
                onChange={e => setCity(e.target.value)}
                /></label>
                <label>State
                <input
                required
                value={state}
                onChange={e => setState(e.target.value)}
                /> </label>
                <label>Country
                <input
                required
                value={country}
                onChange={e => setCountry(e.target.value)}
                /> </label>
                
                <label>Name
                <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                /> </label>
                <label>Description
                <input 
                    type='text'
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                /> </label>
                <label>Price
                <input 
                    type='number'
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                /> </label>
                <label >Preview Image URL
                    <input type='url'
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                    />
                </label>
                <button type="submit" disabled={disabled}>Create new spot</button>
                <button onClick={() => setOpen(!isOpen)}>Cancel</button>
            </form>
        </>
    )
}

export default CreateSpotForm;
