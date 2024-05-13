import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './CustomerServiceMenu.css';

function CustomerServiceMenu() {
    const  Navigate =useNavigate();
//home
    const signouthandle=()=>{
        Navigate('/');
    }
//my account
    const MyAccount=()=>{
        Navigate('/MyAccount');
    }
    
    const custname=localStorage.getItem('name');
    
    const ServiceRequestMenu =()=>{
        Navigate('/ServiceRequestMenu ');  

    }
    
    const profilepage =()=>{
        Navigate('/profile ');  

    }
    const viewpage=()=>{
        Navigate('/view');
    }
    const handlelogout= () => {
        Navigate('/');
      }


  return (
    <div className="container">
      <div className="Wel">
      <h1>Welcome: {custname}</h1>
    </div>
  <div className="cust_ser">
    <div className="Customer">
      <h1 className="t1">Customer Service Menu</h1>
    </div>

    <div className="Customer1">
  <button className="icon-button" onClick={profilepage}>
    <i className="fa-solid fa-user"></i>
    <span className="icontext">My Profile</span>
  </button>
  <button className="icon-button" onClick={MyAccount}>
    <i className="fa-solid fa-file-invoice"></i>
    <span>My Account</span>
  </button>
  <button className="icon-button" onClick={ServiceRequestMenu}>
    <i className="fa-solid fa-square-plus"></i>
    <span>Make a Service Request</span>
  </button>
  <button className="icon-button" onClick={viewpage}>
    <i className="fa-solid fa-person-circle-question"></i>
    <span>View Request Status</span>
  </button>
</div>

    <div className="btn-box">
      <button className="buttoncus" type="submit" onClick={signouthandle}>Back</button>
      <button className="btnlogout" type="button" onClick={handlelogout}>Logout</button>
    </div>
  </div>
</div>
  )
}

export default CustomerServiceMenu;