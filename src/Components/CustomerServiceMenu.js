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
    <div >
   <div className="cust_ser">
   <div className="Wel">
    <h1 >Welcome:{custname}</h1>
    </div>
  <div className="Customer">      
            <h1 className="t1">Customer Service Menu</h1>
             
             </div>

          <div className="Customer1">
          <a href="#" onClick={profilepage}><h1>My Profile</h1></a>
             
            
                <a href="#" onClick={MyAccount}><h1>My Account</h1></a>
                <a href="#"onClick={ServiceRequestMenu }><h1>Make A Service Request</h1></a>
                <a href="#" onClick={viewpage} ><h1>View Request Status</h1></a>
             </div>
        <div className="btn-btn">
     <button className="buttoncus" type="submit" onClick={signouthandle}>Back</button></div>
</div>
<button className='btnlogout' type="button" onClick={handlelogout}>Logout</button>
</div> 
  )
}

export default CustomerServiceMenu;