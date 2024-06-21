import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CreditCardRequest.css';
import { api } from './api/Api';

function CreditCardRequest() {
  const navigate = useNavigate();
 
  const [accountNumber, setAccountNumber] = useState('');
  const [cardType, setCardType] = useState(""); // Store the selected card type
  const[requestMessage,setrequestMessage]=useState('');
  
  const customerId = localStorage.getItem("cid");
  const [accountData1, setAccountData1] = useState([]); // State for storing account numbers
  const custname = localStorage.getItem('name');

   
  const cardTypes = ["Debit", "Credit", "Master"]; // Replace with your card types

  const handleSubmit = (e) => {
    e.preventDefault();

  
    
    // You can perform further actions here, such as submitting the data.
  };

 

  useEffect(() => {
    getAccountNumbers1(); // Fetch account numbers when the component mounts
  }, []);

  const getAccountNumbers1 = async () => {
    try {
      const response = await api.get(`/getlistofAccountbyCustomerId/${customerId}`); // Use the correct API endpoint
      setAccountData1(response.data);
      console.log('Account Numbers:', response.data);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };
 

  const handleBack = () => {
    navigate('/ServiceRequestMenu');
  };
  
  const saveCreditData= async () => {
    var saveObj1 = {
      serviceRequestId:2,
      accountNumber:accountNumber,
      requestMessage:requestMessage,
      cardType:cardType
    }
    // console.log("123456789"+serviceRequestId);
    console.log("ujghjgf", saveObj1);
    try {
      if(cardType && accountNumber){

     await api.post('/savecardrequest', saveObj1)
        .then(response => {
          console.log("Data saved", response.data);
          alert(" Request Data save successfully")
          navigate('/ServiceRequestMenu');
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

  const handleclearcard=async()=>{
    await saveCreditData();
    setCardType('');
    setAccountNumber('');
    setrequestMessage('');
  }

  const asteriskStyle = { color: 'red' };

  return (
    <div>      
      <div className='containerStyle'>
      <h1 className="credittit">Card Request</h1>
        <form onSubmit={handleSubmit}>
        <label className='namlab'>Name</label>
        <input className='namecredit' type='text' value={custname} readOnly />
          <div>
          <label className="labcredit" htmlFor="cardType">Account Number <span style={asteriskStyle}>*</span></label>
          <select
            className='salcred'
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          >
            <option value=''>Select</option>
            {accountData1.map((item) => (
              <option key={item.customerId} value={item.accountnumber}>
                {item.accountnumber}
              </option>
            ))}
            </select>
          </div>
          <div>
            <label  className="labcredit1" htmlFor="cardType">Card Type <span style={asteriskStyle}>*</span></label>
            <select className="salcred1"
              id="cardType"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="">Select a Card type </option>
              {cardTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <label className='mesgreq'>Request Message</label>
          <input className='textreqmsg' type='Textarea' name='text' value={requestMessage} onChange={(e) => setrequestMessage(e.target.value)} />
          
        </form>
        <div className="credit"> 
        <button type="submit" onClick={handleclearcard}>Submit</button>
        <button onClick={handleBack}>Back</button>
        </div> 
      </div>
    </div>
  );
}

export default CreditCardRequest;
