import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginFormPage.css';

function LoginFormPage({isOpen, setOpen}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const user = dispatch(sessionActions.loginUser({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    setOpen(!isOpen);
    return user;
  }

  const demoUser = () => {
    const user = dispatch(sessionActions.loginUser({credential: 'demo@user.io', password: 'password'}))
    return user;
  }

  return (
    <>
    <div className='modal_background'/>
    <div className='modal'>
    <form onSubmit={handleSubmit}>
      <h2>Login to EpicBnB</h2>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
      <button onClick={demoUser}>Demo User</button>
      <button onClick={() => setOpen(!isOpen)}>Close Menu</button>
    </form>
    </div>
    </>
  );
}

export default LoginFormPage;
