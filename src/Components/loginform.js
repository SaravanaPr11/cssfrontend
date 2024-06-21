// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext'; // Assuming this imports the useAuth hook correctly
import './loginform.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const { login } = useAuth(); // Destructure login function from useAuth hook
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
    setUserNameError(''); // Clear username error message when user starts typing
    setServerError(''); // Clear server error message when user starts typing
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(''); // Clear password error message when user starts typing
    setServerError(''); // Clear server error message when user starts typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    let formIsValid = true;

    // Validate username
    if (!username.trim()) {
      setUserNameError('Please enter a valid username');
      formIsValid = false;
    } else {
      setUserNameError('');
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Please enter a valid password');
      formIsValid = false;
    } else {
      setPasswordError('');
    }

    // If form is not valid, do not proceed with submission
    if (!formIsValid) {
      return;
    }

    try {
      // Call login function from useAuth hook
      await login(username, password);

      // Redirect to CustomerServiceMenu upon successful login
      navigate('/CustomerServiceMenu');
    } catch (error) {
      console.error('Login Error:', error);
      setServerError('Login failed. Please check your credentials.');
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
    setUserNameError('');
    setPasswordError('');
    setServerError('');
  };

  return (
    <div className="body">
      <div className="cover">
        <h2 className="h2login">Customer Self Service Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <h3 className="h3login">Username <span style={{ color: 'red' }}>*</span></h3>
            <input
              className="inputlabelnam"
              type="text"
              value={username}
              onChange={handleUserNameChange}
            />
            <br />
            {userNameError && <span className="error-message">{userNameError}</span>}
          </div>
          <br />
          <div className="input-group">
            <h3 className="h3login">Password <span style={{ color: 'red' }}>*</span></h3>
            <input
              className="inputlabelpas"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>
          <br />

          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <button className="btnlogin" type="submit">Login</button>
            <button className="btn1login" type="button" onClick={handleClear}>Clear</button>
          </div>
        </form>

        {serverError && <div className="serverError">{serverError}</div>}
      </div>
    </div>
  );
}

export default LoginForm;
