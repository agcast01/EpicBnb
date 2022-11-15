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
import * as spotActions from './store/spot'
import MySpots from "./components/Spots/MySpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch, user])

  useEffect(() => {
    dispatch(spotActions.load())
}, [dispatch])
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
      <Route path='/mySpots'>
        <MySpots />
      </Route>
    </Switch>)}
    
    </>
  );
}

export default App;
