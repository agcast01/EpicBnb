import { useState } from "react"
import CreateSpotForm from "../Spots/CreateSpotForm"
import MyReviews from "./MyReviews"
import MySpots from "./MySpots"


const ProfilePage = () => {
    const [addPage, setAddPage] = useState(false);

    return (
        <>  
            <h2>Spots</h2>
            <MySpots />
            <button onClick={() => setAddPage(!addPage)}>New Spot</button>
            {addPage && (
                <CreateSpotForm isOpen={addPage} setOpen={setAddPage} />
            )}
            <h2>Reviews</h2>
            <MyReviews />
        </>
    )
}

export default ProfilePage
