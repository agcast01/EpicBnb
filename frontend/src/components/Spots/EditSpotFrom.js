import { useState, useEffect } from "react";
import * as spotActions from '../../store/spot';
import { useDispatch} from "react-redux";


const EditSpotForm = ({isOpen, setOpen, spot}) => {
    const dispatch = useDispatch()



    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([])
    
    useEffect(() => {
        let newErrors = [];
        if(address.length > 50) newErrors.push("Address must be less than 50 characters");
        if(city.length > 25) newErrors.push("City must be less than 25 characters");
        if(state.length > 25) newErrors.push("State must be less than 25 characters");
        if(country.length > 25) newErrors.push("Country must be less than 25 characters");
        if(name.length > 25) newErrors.push("Name must be less than 25 characters");
        setErrors(newErrors);
    }, [address, city, state, country, name])

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
        
        setOpen(!isOpen)
    }
    return (
        <>  
            <div className="modal_background" />
            <div className="modal">
            <form onSubmit={handleSubmit}>
            <ul className='errors'>{Boolean(errors.length) && 
                    errors.map(error => (
                        <li>{error}</li>
                    ))
                }</ul>
                <label>Address
                <input
                placeholder={spot.address}
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                /></label>
                <label>City
                <input
                placeholder={spot.city}
                required
                value={city}
                onChange={e => setCity(e.target.value)}
                /></label>
                <label>State
                <input
                placeholder={spot.state}
                required
                value={state}
                onChange={e => setState(e.target.value)}
                /></label>
                <label>Country
                <input
                placeholder={spot.country}
                required
                value={country}
                onChange={e => setCountry(e.target.value)}
                /></label>
                <label>Name
                <input
                    type="text"
                    required
                    placeholder={spot.name}
                    value={name}
                    onChange={e => setName(e.target.value)}
                /></label>
                <label>Description
                <input
                    type='text'
                    required
                    placeholder={spot.description}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                /></label>
                <label>Price
                <input 
                    type='number'
                    required
                    value={price || spot.price}
                    onChange={e => setPrice(e.target.value)}
                /></label>
                <button disabled={Boolean(errors.length)} type="submit">Edit spot</button>
                <button onClick={() => setOpen(!isOpen)}>Cancel</button>
            </form>
            </div>
        </>
    )
}

export default EditSpotForm;
