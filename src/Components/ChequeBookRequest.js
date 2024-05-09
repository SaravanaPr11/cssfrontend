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
      const response = await api.get(`/fetchaccnumber/${customerId}`); // Use the correct API endpoint
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

  const saveChequeData= async () => {
    var saveObj = {
      serviceRequestId:1,
      accountNumber:accountNumber,
      requestMessage:requestMessage,
      noOfChequeLeaves:noOfChequeLeaves
    }
    // console.log("123456789"+serviceRequestId);
    console.log("ujghjgf", saveObj);
    try {
      if(noOfChequeLeaves && accountNumber && requestMessage){

     await api.post('/postcardrequest', saveObj)
        .then(response => {
          console.log("Data saved", response.data);
          alert("Request Data save successfully")
        })
    } 
    else{
      alert("Please fill the mandatory field");
    }
  }
    catch (error) {
      console.log("sorry data not save", error);
    }
  }
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
      <h1 className='book'>
        Cheque Book Request
      </h1>
      
      <div className='containerStylecheque'>
      <h2 className='book1'>Name: {custname}</h2>
       
      <form className='car' >
        <div>
        <label className='chequelab'>
          <span style={asteriskStyle}>*</span> Account Number:
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
        <br /><br /><br />
        <div>
        <label className='chequelab1'>
          <span style={asteriskStyle}>*</span> Number of cheque leaves:  
        </label>
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
            </div><br/>
            <label className='request'>RequestMessage:</label>
            <div>         <input className='textreqcheque' type='Textarea' name='text' value={requestMessage} onChange={(e) => setrequestMessage(e.target.value)} />
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
