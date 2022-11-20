import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage/SignupFormPage';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [loginOpen, setLoginOpen] = useState(false)
  const [signup, setSignup] = useState(false)

  const toggleModal = (state, change) => {
    change(!state)
  }

  let sessionLinks;
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
        <NavLink exact to="/">Home</NavLink>
        <span className='profile' >
          {isLoaded && sessionLinks}
          <span className="material-symbols-outlined" id="profile-pic">
            person_filled
          </span>
        </span>
      </li>
    </ul>
  );
}

export default Navigation;
