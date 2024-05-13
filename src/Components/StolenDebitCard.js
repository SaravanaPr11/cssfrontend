import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/Api";
import "./Stolendebitcard.css";

function StolenDebitCard() {
  const navigate = useNavigate();
  const customerId = localStorage.getItem("cid");
  const [accountData2, setAccountData2] = useState([]);
  const [stolenDate, setStolenDate] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const custname = localStorage.getItem("name");
  const cardTypes = ["Debit", "Credit", "Master"];

  useEffect(() => {
    getAccountNumbers2();
  }, []);

  const getAccountNumbers2 = async () => {
    try {
      const response = await api.get(`/getlistofAccountbyCustomerId/${customerId}`);
      setAccountData2(response.data);
      console.log("Account Numbers:", response.data);
    } catch (error) {
      console.error("Error fetching account numbers:", error);
    }
  };

  const handleBack = () => {
    navigate("/ServiceRequestMenu");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const saveStolenData = async () => {
    try {
      // Construct the request payload
      const saveObj3 = {
        accountNumber: Number(accountNumber),
        requestMessage: requestMessage,
        losttolenDate: stolenDate, // Ensure the date format matches the API's expected format
        cardNumber: cardNumber, // Assuming cardNumber is a number
        cardType: cardType
      };
  
      // Check if all mandatory fields are filled
      if (accountNumber && cardType && stolenDate && cardNumber && requestMessage) {
        // Make the POST request to the API endpoint
        const response = await api.post('/savelost', saveObj3);
  
        // Check if the request was successful
        if (response.status === 200) {
          console.log("Data saved", response.data);
          alert("Request Data saved successfully");
        } else {
          console.error("Failed to save data:", response.statusText);
          alert("Failed to save request data");
        }
      } else {
        alert("Please fill the mandatory fields");
      }
    } catch (error) {
      console.error("Sorry, data not saved", error);
      alert("Failed to save request data");
    }
  };
      
  const handleSubmitStolen = async () => {
    await saveStolenData();
    // Reset form fields after submission
    setStolenDate("");
    setAccountNumber("");
    setRequestMessage("");
    setCardType("");
    setCardNumber("");
  };

  const asteriskStyle = { color: "red" };

  return (
    <div>
      <button className="stolenlogout" type="button" onClick={handleLogout}>
        Logout
      </button>
      <div className="containerStylestolen">
        <h1 className="stoltit">Lost / Stolen Card Request</h1>
        <form>
          <div>
            <label className="namestol">Name: {custname}</label>
          </div>
          <div>
            <label className="labstol">
              Account Number <span style={asteriskStyle}>*</span>
              <select
                className="salstol"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              >
                <option value="">Select</option>
                {accountData2.map((item) => (
                  <option key={item.customerId} value={item.accountNumber}>
                    {item.accountnumber}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="labstol1" htmlFor="cardType">
              Card Type
            </label>
            <select
              className="salstol1"
              id="cardType"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="">Select a card type</option>
              {cardTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="labstol2" htmlFor="lostStolenOn">
              Lost / Stolen on
            </label>
            <input
              className="salstol2"
              type="date"
              id="lostStolenOn"
              value={stolenDate}
              onChange={(e) => setStolenDate(e.target.value)}
            />
          </div>
          <label className="labstol3">Card Number</label>
          <input
            className="salstol3"
            type="text"
            name="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <br />
          <label className="labstol4">Request Message</label>
          <input
            className="salstol4"
            type="text"
            name="text"
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
          />
        </form>
        <div className="stol">
          <button type="submit" onClick={handleSubmitStolen}>
            Submit
          </button>
          <button onClick={handleBack}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default StolenDebitCard;
