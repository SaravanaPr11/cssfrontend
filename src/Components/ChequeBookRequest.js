import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chequebook.css';
import api from './api/Api';
import { useParams } from 'react-router-dom';

const ChequeBookRequest = () => {
  const navigate = useNavigate();
  const customerId = localStorage.getItem("cid");
  const [accountData, setAccountData] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [noOfChequeLeaves, setChequeLeaves] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const custname = localStorage.getItem('name');
  const checkbook = ["20", "50", "100"];

  useEffect(() => {
    getAccountNumbers();
  }, []);

  const getAccountNumbers = async () => {
    try {
      const response = await api.get(`/getlistofAccountbyCustomerId/${customerId}`);
      setAccountData(response.data);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };

  const handleBack = () => {
    navigate('/ServiceRequestMenu');
  };

  const handleLogout = () => {
    // Clear any sensitive data here
    localStorage.removeItem("cid");
    localStorage.removeItem("name");

    // Navigate to the login page and replace history
    navigate('/', { replace: true });
  };


  const saveChequeData = async () => {
    const saveObj = {
      serviceRequestId: 1,
      accountNumber: Number(accountNumber),
      requestMessage: requestMessage,
      noOfChequeLeaves: noOfChequeLeaves
    };

    try {
      if (noOfChequeLeaves && accountNumber) {
        const response = await api.post('/postcardRequest', saveObj);
        console.log("Response:", response);
        if (response.data && response.status === 200) {
          if (response.data.status === "success") {
            console.log("Data saved successfully");
            alert("Request Data saved successfully");
            navigate('/ServiceRequestMenu');
          } else if (response.data.data === "No account number found") {
            console.error("No account number found");
            alert("No account number found");
          } else {
            console.error("Failed to save data:", response.data);
            alert("Failed to save request data");
          }
        } else {
          console.error("Failed to save data:", response.statusText);
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

  const handleSubmitCheque = async (e) => {
    e.preventDefault(); 
    await saveChequeData();
    setChequeLeaves('');
    setAccountNumber('');
    setRequestMessage('');
  };

  const asteriskStyle = { color: 'red' };

  return (
    <div>
      <button className='checklogout' type="button" onClick={handleLogout}>Logout</button>
      <div className='containerStylecheque'>
        <h1 className='book'>Cheque Book Request</h1>
        <label className='namlab1'>Name</label>
        <input className='namecheque1' type='text' value={custname} readOnly />
        <form className='car'>
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
                  <option key={item.customerId} value={item.accountNumber}>
                    {item.accountnumber}
                  </option>
                ))}
              </select>
            </label>
          </div>
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
              <input className='textreqcheque' type='Textarea' name='text' value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} />
            </label>
          </div>
          <div className='sub'>
            <button type="submit" className="button-56" role="button" onClick={handleSubmitCheque}>
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
