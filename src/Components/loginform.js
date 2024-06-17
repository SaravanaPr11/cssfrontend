// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext'; // Assuming this imports the useAuth hook correctly
import api from './api/Api';
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
    setUserNameError(''); // Clear error message when user starts typing
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(''); // Clear error message when user starts typing
  };

  const handleSubmit = async () => {
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
      const { data } = await api.post('/api/v1/auth/authenticate', { username, password });
      console.log('API Response:', data);

      if (data.token && data.refreshToken) {
        console.log('Login Successful');
        alert('Login successful');

        // Store user data in context
        login(data); // Store user data in context
        navigate('/CustomerServiceMenu');
      } else {
        setServerError('Login Failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setServerError('Enter valid credentials');
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
          <button className="btnlogin" type="submit" onClick={handleSubmit}>Login</button>
          <button className="btn1login" type="button" onClick={handleClear}>Clear</button>
        </div>

        <div className="serverError">{serverError}</div>
      </div>
    </div>
  );
}

export default LoginForm;
