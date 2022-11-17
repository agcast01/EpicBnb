import { useEffect, useState} from "react";
import * as spotActions from '../../store/spot';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const EditSpotForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const spot = useSelector(state => state.spots)
    useEffect(() => {
        dispatch(spotActions.singleSpot(spotId))
    }, [dispatch])

    const {spotId} = useParams()

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

        spot.address = address;
        spot.city = city;
        spot.state = state;
        spot.country = country;
        spot.lat = lat;
        spot.lng = lng;
        spot.name = name;
        spot.description = description;
        spot.price = price;

        dispatch(spotActions.edit(spot))
        
        history.push(`/${spotId}`)
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
                <button type="submit">Edit spot</button>
            </form>
        </>
    )
}

export default EditSpotForm;
