import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/Api";
import "./MyAccount.css";


function MyAccount() {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState([]);
  const customerId = localStorage.getItem("cid");
  const custname=localStorage.getItem('name');

 
  
  useEffect(() => {
    getAccountDetails();
  }, []);

  const getAccountDetails = async () => {
    if (customerId) {
      try {
        const response = await api.get(`/accdetails/${customerId}`);
        console.log('api Response:', response);
        // Assuming the response data is an array, update the state with the data
        setResponseData(response.data);
      } catch (error) {
        console.log("Something's wrong with the API request", error);
      }
    } else {
      console.log("No Customer with this id found");
    }
  };
const handleAccountStatement=(accountNumber)=>{
  navigate(`/AccountStatement/${accountNumber}`)
} ;
  const handleBack = () => {
    navigate("/CustomerServiceMenu");
  };
  const handlelogout = () => {
    // Clear any sensitive data here
    localStorage.removeItem("cid");
    localStorage.removeItem("name");

    // Navigate to the login page and replace history
    navigate('/', { replace: true });
  };


  

  return (
    <div className="centered-container">
      <button  className="btnlogout2" type="button" onClick={handlelogout}>Logout</button>
      <h4 className="accountname">Welcome: {custname}</h4>
      <div className="my-account-container">
        <div className="my-Accounts">
          <p>
            My Accounts
          </p>  </div>
      
        <table className="tableaccount">
          <thead >
            <tr className="titaccount">
              <th scope="col">Account Number</th>
              <th scope="col">Account Type</th>
              <th scope="col">Account Balance</th>
              <th scope="col">Branch Name</th>
              <th scope="col">IFSC Code</th>
              
              

            </tr>
          </thead>
          <tbody >
            {responseData.map((cd, index) => (
              <tr key={index}  className="tdclass">
                <td>
                  <button
                  type="button"
                  className="account-link"
                  onClick={()=>handleAccountStatement(cd.accountNumber)}
                  >
                   {cd.accountNumber}
                  </button>
                </td>
                
                <td>{cd.accountType}</td>
                <td>{cd.accountBalance}</td>
                <td>{cd.branchName}</td>
                <td>{cd.ifscCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      <div>
        <button type="button" className="back-button1" onClick={handleBack}>
          Back
        </button>
      </div>
    
    </div>
  );
}

export default MyAccount;
