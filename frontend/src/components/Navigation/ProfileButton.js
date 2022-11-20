import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import ProfileModal from "./ProfileModal";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
  };

  return (
    <>
      <button onClick={openMenu}>
      <span className="material-symbols-outlined">
        menu
      </span>
      </button>
      {showMenu && (
        <ProfileModal>
        <ul className="profile-dropdown">
          <li>{user.user.username}</li>
          <li>{user.user.email}</li>
          <li>
            <button onClick={() => history.push(`/profile`)}>Profile Page</button>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
        </ ProfileModal>
      )}
    </>
  );
}

export default ProfileButton;
