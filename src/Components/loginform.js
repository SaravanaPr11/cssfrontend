import { useState,useEffect } from 'react';
import './loginform.css'
import { useNavigate } from "react-router-dom";
import api from './api/Api';

function LoginForm({ OnLogin }) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();
  const [userNameError, setUserNameError] = useState('');
  const [userPassworderror, setpasswordError] = useState('');
  const [serverError, setServerError] = useState(' ');
 


  const handelUserNameChange = (event) => {
    console.log("event", event.target.value);
    setUsername(event.target.value)
    if (event.target.value !== "") {
      setUserNameError('');
    }
  }
  const handlepassword = (event) => {
    console.log("pass", event.target.value)
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setpasswordError('');
    }
  }


  const handleSubmit = async () => {
    if (!userName || !password) {
      if (!userName) {
        setUserNameError("Please enter a valid username");
      }
      if (!password) {
        setpasswordError("Please enter a valid password");
      }
      return;
    }
  
    try {
      const loginResponse = await api.post('/validateUser', {
        userName,
        password,
      });
      console.log('API Response:', loginResponse);
  
      if (loginResponse.data.Message === "Login Successful") {
        console.log("Login Successful", loginResponse.data.customerId);
        alert("Login successful");
  
        localStorage.setItem('cid', loginResponse.data.customerId);
        localStorage.setItem('name', loginResponse.data.name);
  
        navigate('/CustomerServiceMenu');
      } else {
        alert("Login Failed....Please enter valid username and password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };
    
  const handleClear = () => {
    setUsername('');
    setPassword('');
    setUserNameError('');
    setpasswordError('');
    setServerError('');
  }


  return (
    <div className="body" >
      <div className="cover">
        <h2 className='h2login'>Customer Self Service Login</h2>
        <div className="input-group">
          <h3 className='h3login'>Username <span style={{ color: 'red' }}>*</span></h3>
          <div className="icon1">
            <i className="fas fa-user"></i></div>
          <input className="inputlabelnam" type='text' value={userName} onChange={handelUserNameChange} />

          <span style={{ color: "red" }}>{userNameError}</span>
        </div>
        <br/>
        <div className="input-group">
          <h3 className='h3login'>Password <span style={{ color: 'red' }}>*</span></h3>
          <div className="icon2">
            <i className="fas fa-key"></i></div>
          <input className="inputlabelpas" type='password' value={password} onChange={handlepassword} /><br />
          <span style={{ color: 'red' }}>{userPassworderror}</span>
        </div>
        <br />

        <div style={{ display: 'flex', justifyContent: "space-around", width: "100%" }}>
          <button className="btnlogin" type='submit' onClick={handleSubmit}>Login</button>
          <button className="btn1login" type='button' onClick={handleClear} aria-required 
          >Clear</button>
        </div>

        <div className="serverError">{serverError}</div>


      </div>



    </div>

  )
}
export default LoginForm;