import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage/SignupFormPage';
import CreateSpotForm from '../Spots/CreateSpotForm';
import logo from '../../images/favicon.ico';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [loginOpen, setLoginOpen] = useState(false)
  const [signup, setSignup] = useState(false)
  const [createSpot, setCreateSpot] = useState(false)

  const toggleModal = (state, change) => {
    change(!state)
  }

  let sessionLinks;
  useEffect(() => {
    if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser} />
      );
  } else {
      sessionLinks = (
        <>
          <button onClick={() => toggleModal(loginOpen, setLoginOpen)}>Log In</button>
          {loginOpen && (
            <LoginFormPage isOpen={loginOpen} setOpen={setLoginOpen}/>
          )}
          <button onClick={() => toggleModal(signup, setSignup)}>Signup</button>
          {signup && (
            <SignupFormPage isOpen={signup} setOpen={setSignup}/>
          )}
        </>
      );
  }
  }, [signup])
  if (sessionUser) {
      sessionLinks = (
        <ProfileButton user={sessionUser} />
      );
  } else {
      sessionLinks = (
        <>
          <button onClick={() => toggleModal(loginOpen, setLoginOpen)}>Log In</button>
          {loginOpen && (
            <LoginFormPage isOpen={loginOpen} setOpen={setLoginOpen}/>
          )}
          <button onClick={() => toggleModal(signup, setSignup)}>Signup</button>
          {signup && (
            <SignupFormPage isOpen={signup} setOpen={setSignup}/>
          )}
        </>
      );
  }

  

  return (
    <ul className='navbar'>
      <li>
        <NavLink exact to="/"><img src={logo} alt='logo' style={{width: '30px'}}/>EpicBnB</NavLink>
        <span className='right' >
        <span onClick={() => toggleModal(createSpot, setCreateSpot)}>EpicBnB your home</span>
        {createSpot && (
          <CreateSpotForm isOpen={createSpot} setOpen={setCreateSpot} />
        )}
          <span className='profile'>
          {isLoaded && sessionLinks}
          <span className="material-symbols-outlined" id="profile-pic">
            person_filled
          </span>
          </span>
        </span>
      </li>
    </ul>
  );
}

export default Navigation;
