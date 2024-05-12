import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chequebook.css';
import api from './api/Api';
import { useParams } from 'react-router-dom';

const ChequeBookRequest = () => {
  const navigate = useNavigate();
  // const { accountNumber } = useParams(); // Remove this line
  // const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [noOfChequeLeaves, setChequeLeaves] = useState('');
  
  const customerId = localStorage.getItem("cid");
  const [accountData, setAccountData] = useState([]); // State for storing account numbers
  const custname = localStorage.getItem('name');
  
  // const customerId = useParams().customerId; // Retrieve customerId from URL parameters
  const[requestMessage,setrequestMessage]=useState('');
  
  const checkbook = ["20", "50", "100"];

  

  useEffect(() => {
    getAccountNumbers(); // Fetch account numbers when the component mounts
  }, []);

  const getAccountNumbers = async () => {
    try {
      const response = await api.get(`/getlistofAccountbyCustomerId/${customerId}`); // Use the correct API endpoint
      setAccountData(response.data);
      console.log('Account Numbers:', response);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };
 

  const handleBack = () => {
    navigate('/ServiceRequestMenu');
  };
const handlelogout=()=>{
  navigate('/');
}

const saveChequeData = async () => {
  const saveObj = {
    serviceRequestId: 1,
    accountNumber: Number(accountNumber), // Convert accountNumber to number
    requestMessage: requestMessage,
    noOfChequeLeaves: noOfChequeLeaves
  };

  try {
    if (noOfChequeLeaves && accountNumber && requestMessage) {
      const response = await api.post('/postcardRequest', saveObj);
      console.log("Response:", response); // Log the response
      if (response.data && response.data.status === "success") {
        console.log("Data saved successfully");
        alert("Request Data saved successfully");
      } else {
        console.error("Failed to save data:", response.data);
        alert("Failed to save request data");
      }
    } else {
      alert("Please fill in the mandatory fields");
    }
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Failed to save request data");
  }
};

//for clear the page after submit the data
  const handlesubcheque=async()=>{
    await saveChequeData();
    setChequeLeaves('');
    setAccountNumber('');
    setrequestMessage('');
  }

  // Define a style for the asterisk
  const asteriskStyle = { color: 'red' };

  return (
    
    <div>
      <button className='checklogout' type="button" onClick={handlelogout}>Logout</button>
      <div className='containerStylecheque'>

      <h1 className='book'>
        Cheque Book Request
      </h1>
      
      <h2 className='book1'>Name: {custname}</h2>
       
      <form className='car' >
        <div>
        <label className='chequelab'>
          Account Number <span style={asteriskStyle}>*</span>
          <select
            className='salcheque'
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          >
            <option value=''>Select</option>
            {accountData.map((item) => (
              <option key={item.customerId} value={item.customerId}>
                {item.accountnumber}
              </option>
            ))}
          </select>
        </label></div>
        <div>
        <label className='chequelab1'>
          Number of cheque leaves <span style={asteriskStyle}>* </span>
        <select
        className='sal1cheque'
              id="noofcheck"
              value={noOfChequeLeaves}
              onChange={(e) => setChequeLeaves(e.target.value)}
            >
              <option value="">Select a Cheque leaves</option>
              {checkbook.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            </label>
            </div>
            <div>
            <label className='request'>Request Message 
            <input className='textreqcheque' type='Textarea' name='text' value={requestMessage} onChange={(e) => setrequestMessage(e.target.value)} />
            </label>
            </div>
        
        
        <div className='sub'>
          <button type="submit" className="button-56" role="button" onClick={handlesubcheque}>
            Submit
          </button>
          <button
            className="button-56"
            role="button"
            onClick={handleBack}
            type="button"
          >
            Back
          </button>
        </div>
       
      </form>
      
    </div>
    </div>
  );
};

export default ChequeBookRequest;
