import { useState, useEffect } from 'react';
import './loginform.css';
import { useNavigate } from 'react-router-dom';
import api from './api/Api';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [userPasswordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
    if (event.target.value !== '') {
      setUserNameError('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value !== '') {
      setPasswordError('');
    }
  };

  const handleSubmit = async () => {
    if (!username || !password) {
      if (!username) {
        setUserNameError('Please enter a valid username');
      }
      if (!password) {
        setPasswordError('Please enter a valid password');
      }
      return;
    }

    try {
      const loginResponse = await api.post('/api/v1/auth/authenticate', { username, password });
      console.log('API Response:', loginResponse);

      if (loginResponse.data.token && loginResponse.data.refreshToken) {
        console.log('Login Successful');
        alert('Login successful');

        localStorage.setItem('cid', loginResponse.data.customerId);
        localStorage.setItem('name', loginResponse.data.name);
        localStorage.setItem('accessToken', loginResponse.data.token);
        localStorage.setItem('refreshToken', loginResponse.data.refreshToken);

        navigate('/CustomerServiceMenu');
      } else {
        setServerError('Login Failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setServerError('An error occurred. Please try again later.');
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
            onFocus={() => setIsUsernameFocused(true)}
            onBlur={() => setIsUsernameFocused(false)}
          />
          <span style={{ color: 'red' }}>{userNameError}</span>
        </div>
        <br />
        <div className="input-group">
          <h3 className="h3login">Password <span style={{ color: 'red' }}>*</span></h3>
          <input
            className="inputlabelpas"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          /><br />
          <span style={{ color: 'red' }}>{userPasswordError}</span>
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
