import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import Spots from "./components/Spots/Spots";
import * as sessionActions from './store/session'
import CreateSpotForm from './components/Spots/CreateSpotForm'
import * as spotActions from './store/spot'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

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
    </Switch>)}
    
    </>
  );
}

export default App;
