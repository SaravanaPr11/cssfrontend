import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/Api";
import "./Stolendebitcard.css";


function StolenDebitCard() {
  const navigate = useNavigate();
  
  
  const [stolenDate, setStolenDate] = useState("");
  
  const customerId = localStorage.getItem("cid");
  const[requestMessage,setrequestMessage]=useState(' ')
  const [accountNumber, setAccountNumber] = useState([]);
  const [accountData2, setAccountData2] = useState([]); // State for storing account numbers
  const custname = localStorage.getItem('name');
  const[cardType,setCardType]=useState(' ');
  const[cardNumber,setcardNumber]=useState('');
  const cardTypes = ["Debit", "Credit", "master"];
  
   // Replace with your account numbers
   

  // Calculate the minimum and maximum allowed dates
  const currentDate = new Date();
  const maxDate = new Date(currentDate); // Today's date
  maxDate.setDate(maxDate.getDate() - 1); // Subtract 1 day to disallow future dates
  const minDate = new Date(currentDate); // Today's date
  minDate.setDate(minDate.getDate() - 7); // Subtract 7 days to allow dates up to 1 week ago

  // Convert the minimum and maximum dates to strings in the "YYYY-MM-DD" format
  const minDateString = minDate.toISOString().split('T')[0];
  const maxDateString = maxDate.toISOString().split('T')[0];

  const handleDateChange = (event) => {
    const selected = event.target.value;

    // Check if the selected date is within the allowed date range
    if (selected >= minDateString && selected <= maxDateString) {
      setStolenDate(selected);
    } else {
      alert('You can only select dates from today up to 1 week ago.');
    }
  };

 

  useEffect(() => {
    getAccountNumbers2(); // Fetch account numbers when the component mounts
  }, []);

  const getAccountNumbers2= async () => {
    try {
      const response = await api.get(`/getlistofAccountbyCustomerId/${customerId}`); // Use the correct API endpoint
      setAccountData2(response.data);
      console.log('Account Numbers:', response.data);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };

  const handleBack = () => {
    navigate('/ServiceRequestMenu');
  };

  const savestolenData= async () => {
    var saveObj3 = {
      "stolenDate":stolenDate,
      "serviceRequestId":3,
      "accountNumber":accountNumber,
      "requestMessage":requestMessage,
      "cardType":cardType,
      "cardNumber":cardNumber
    }
    // console.log("123456789"+serviceRequestId);
    console.log("ujghjgf", saveObj3);
    try {
      if( accountNumber  && cardType  && stolenDate && cardNumber && requestMessage){

     await api.post('/savelost', saveObj3)
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

  const handlesubstolen=async()=>{
    await savestolenData();
    setStolenDate('');
    setAccountNumber('');
    setrequestMessage('');
    setCardType('');
    setcardNumber('');

  }
  const handlelogout=()=>{
    navigate('/')
  }

  const asteriskStyle = { color: 'red' }; 

  return (
    <div>
       <button className='stolenlogout' type="button" onClick={handlelogout}>Logout</button>
     
      <div className='containerStylestolen'>
      <h1 className="stoltit">Lost / Stolen Card Request</h1>
        <form >
          <div>
            <label className="namestol">Name{custname}</label>
          
          </div>
          <div>
          <label className="labstol">
           Account Number <span style={asteriskStyle}>*</span>
          <select
            className='salstol'
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          >
            <option value=''>Select</option>
            {accountData2.map((item) => (
              <option key={item.customerId} value={item.customerId}>
                {item.accountnumber}
              </option>
            ))}
          </select>
        </label>
            
          </div>
          
          <div>
            <label className="labstol1" htmlFor="cardType">Card Type</label>
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
            <label className="labstol2" htmlFor="lostStolenOn">Lost / Stolen on</label>
            <input
            className="salstol2"
              type="date"
              id="lostStolenOn"
              value={stolenDate}
              max={maxDateString}
              min={minDateString}
              onChange={handleDateChange}
            />
          </div>
          <label className='labstol3'>Card Number</label>
          <input className='salstol3' type='Textarea' name='text' value={cardNumber} onChange={(e) => setcardNumber(e.target.value)} />
<br/>
          <label className='labstol4'>Request Message</label>
          <input className='salstol4' type='Textarea' name='text' value={requestMessage} onChange={(e) => setrequestMessage(e.target.value)} />
        </form>
        <div className="stol">
        <button type="submit" onClick={handlesubstolen}>Submit</button>
        <button onClick={handleBack}>Back</button>
        </div>
          
      </div>
    </div>
  );
}

export default StolenDebitCard;
