import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage({setOpen, isOpen, user}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    let newErrors = [];
    if(username.length > 20) newErrors.push("Username must be less than 20 characters");
    if(password.length < 8) newErrors.push("Password must be more than 8 characters");
    if(!email.includes('@')) newErrors.push("Must be a valid email.")
    setErrors(newErrors);
  }, [username, password, email])

  if (sessionUser) return <Redirect to="/" />;



  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const newUser = dispatch(sessionActions.userSignUp({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });

        setOpen(!isOpen)
        return newUser;
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
    <div className="modal_background"/>
    <div className="modal">
      <h2>Signup to EpicBnB</h2>
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        First Name
        <input 
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input 
          type='text'
          value={lastName}
          onChange={e => setLastName(e.target.value)}
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
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={Boolean(errors.length)}>Sign Up</button>
      <button onClick={() => setOpen(!isOpen)}>Cancel</button>
    </form>
    </div>
    </>
  );
}

export default SignupFormPage;
