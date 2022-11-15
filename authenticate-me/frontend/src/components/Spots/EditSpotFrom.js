import { useState} from "react";
import * as spotActions from '../../store/spot';
import { useDispatch } from "react-redux";

const EditSpotForm = () => {
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

        dispatch(spotActions.edit(payload))
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Address</label>
                <input
                placeholder="address"
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                />
                <label>City</label>
                <input
                placeholder="city"
                required
                value={city}
                onChange={e => setCity(e.target.value)}
                />
                <label>State</label>
                <input
                placeholder="state"
                required
                value={state}
                onChange={e => setState(e.target.value)}
                />
                <label>Country</label>
                <input
                placeholder="country"
                required
                value={country}
                onChange={e => setCountry(e.target.value)}
                />
                <label>Latitude</label>
                <input
                placeholder="latitude"
                type="number"
                required
                value={lat}
                min='0'
                onChange={e => setLat(e.target.value)}
                />
                <label>Longitude</label>
                <input
                placeholder="longitude"
                type="number"
                required
                value={lng}
                min='0'
                onChange={e => setLng(e.target.value)}
                />
                <label>Name</label>
                <input
                    type="text"
                    required
                    placeholder="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <label>Description</label>
                <input 
                    type='text'
                    required
                    placeholder="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label>Price</label>
                <input 
                    type='number'
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <button type="submit">Create new spot</button>
            </form>
        </>
    )
}

export default EditSpotForm;
