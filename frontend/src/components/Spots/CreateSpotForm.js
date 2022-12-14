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
import { useHistory } from "react-router-dom";

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
    const [price, setPrice] = useState(50);
    const [previewImage, setPreviewImage] = useState('')
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session)

    const disabled = Boolean(!user.user);    
    const history = useHistory();

    useEffect(() => {
        let newErrors = [];
        if(address.length > 50) newErrors.push("Address must be less than 50 characters");
        if(city.length > 25) newErrors.push("City must be less than 25 characters");
        if(state.length > 25) newErrors.push("State must be less than 25 characters");
        if(country.length > 25) newErrors.push("Country must be less than 25 characters");
        if(name.length > 25) newErrors.push("Name must be less than 25 characters");
        if(price < 50) newErrors.push('Price must be at least $50 per night.')
        setErrors(newErrors);
    }, [address, city, state, country, name, price])
    
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
            price,
            previewImage
        }

        dispatch(spotActions.create(payload))
        setOpen(!isOpen)
    }
    return (
        <>  
            
            <div className="modal_background" />
            <div className="modal">
                <h2>EpicBnB your home today</h2>
                <ul className='errors'>{Boolean(errors.length) && 
                        errors.map(error => (
                            <li>{error}</li>
                        ))
                    }</ul>
                <form onSubmit={handleSubmit}>
                    
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
                        min='50'
                        onChange={e => setPrice(e.target.value)}
                    /> </label>
                    <label>Preview Image URL
                        <input type='url'
                            required
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                        />
                    </label>
                    <button type="submit" disabled={disabled || Boolean(errors.length)}>Create new spot</button>
                    <button onClick={() => setOpen(!isOpen)}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default CreateSpotForm;
