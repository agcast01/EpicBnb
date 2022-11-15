import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSpots } from "../../store/spot";
const MySpots = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userSpots())
    }, [dispatch])

    const spots = useSelector(state => state.spots)
    console.log('Spots:', spots.spots);
    return(
        <>
        <ul>
            {spots.spots && spots.spots.length && spots.spots.map()}
        </ul>
            
        </>
    )
}
export default MySpots;
