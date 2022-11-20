import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import Spots from "./components/Spots/Spots";
import * as sessionActions from './store/session'
import CreateSpotForm from './components/Spots/CreateSpotForm'
import MySpots from "./components/ProfilePage/MySpots";
import SpotDetails from "./components/Spots/SpotDetails";
import EditSpotForm from "./components/Spots/EditSpotFrom";
import DeleteSpotForm from "./components/Spots/DeleteSpotForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import EditReviewForm from "./components/Reviews/EditReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch, user])

  /* useEffect(() => {
    dispatch(spotActions.load())
}, [dispatch]) */
  return (
    <>
    <Navigation isLoaded={isLoaded}/>
    {isLoaded && (
    <Switch>
      <Route exact path='/'>
        <Spots />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="/addSpot">
        <CreateSpotForm />
      </Route>
      <Route path='/profile'>
        <ProfilePage />
      </Route>
      <Route exact path='/:spotId'>
        <SpotDetails />
      </Route>
      <Route path='/editSpot/:spotId'>
        <EditSpotForm />
      </Route>
      <Route path='/deleteSpot/:spotId'>
        <DeleteSpotForm />
      </Route>
      <Route path = '/editReview/:reviewId'>
        <EditReviewForm />
      </Route>
    </Switch>)}
    
    </>
  );
}

export default App;
