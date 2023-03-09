import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots/Spots";
import * as sessionActions from './store/session'
import SpotDetails from "./components/Spots/SpotDetails";
import ProfilePage from "./components/ProfilePage/ProfilePage";


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
      <Route path='/profile'>
        <ProfilePage />
      </Route>
      <Route exact path='/:spotId'>
        <SpotDetails />
      </Route>

    </Switch>)}
    
    </>
  );
}

export default App;
