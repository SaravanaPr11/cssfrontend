import React, { useState,  useEffect } from 'react';
import "./viewrequest.css";
import api from './api/Api';
import { useNavigate} from 'react-router-dom';

import moment from 'moment';


const RequestStatus = () => {
  // Sample request data
  const navigate = useNavigate();
  // const history = useHistory();
  const custname = localStorage.getItem('name');

  const [requestType, setRequestType] = useState('');
  const[accountNumber,setAccountNumber]=useState('')
  const customerId = localStorage.getItem("cid");
  const [responseData, setResponseData] = useState([])
  const[accountData1,setAccountData1]=useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  
  const Backoffice=()=>{
    navigate("/CustomerServiceMenu")
  }

  useEffect(() => {
    getAccountNumbers(); // Fetch account numbers when the component mounts
  }, []);

  const getAccountNumbers = async () => {
    try {
      const response = await api.get(`/fetchAcc/${customerId}`); // Use the correct API endpoint
      setAccountData1(response.data);
      console.log('Account Numbers:', response);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };
 
  useEffect(() => {
    if (requestType) {
        var obj = {
            service_request_id: +requestType,
            accountNumber: +accountNumber
        };

        try {
            api.post('/getbyserviceid', obj)
               .then((res) => {
                   console.log("Response data:", res?.data);
                   // Filter the response data based on the selected request type
                   const filteredData = filterData(res?.data, requestType);
                   setResponseData(filteredData);
               })
               .catch((error) => {
                   console.log("Error:", error);
               });
        } catch (error) {
            console.log("Error:", error);
        }
    }
}, [requestType, accountNumber]);

// Function to filter the response data based on the selected request type
const filterData = (responseData, requestType) => {
    switch (requestType) {
        case "1": // Cheque Book Request
            return {
                CHequeBook: responseData.CHequeBook,
                CreditorDebitCard: [], // Clear other lists
                LostorStolen: [] // Clear other lists
            };
        case "2": // Credit/Debit Card
            return {
                CHequeBook: [], // Clear other lists
                CreditorDebitCard: responseData.CreditorDebitCard,
                LostorStolen: [] // Clear other lists
            };
        case "3": // Lost/Stolen Card
            return {
                CHequeBook: [], // Clear other lists
                CreditorDebitCard: [], // Clear other lists
                LostorStolen: responseData.LostorStolen
            };
        default:
            return responseData; // Return full data for "Select" option or any other case
    }
};

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = Array.isArray(responseData) ? responseData.slice(indexOfFirstItem, indexOfLastItem) : [];

const nextPage = () => {
    if (indexOfLastItem < responseData.length) {
        setCurrentPage((prevPage) => prevPage + 1);
    }
};

const prevPage = () => {
    if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
    }
};

const formatedate=(date)=>{
  return moment(date).format("DD-MM-YYYY");

}



  const handleChangeRequestType = (e) => {
    setRequestType(e.target.value);
    
  }
  const handlelogout=()=>{
    localStorage.clear();
    // history.replace('/');
    navigate('/')
  }

   
 

  return (
    <div className="srcont">
    <div className="T_Container">
      <button className='viewlogout' type="button" onClick={handlelogout}>Logout</button>
        <div className="T_title"><h1><center>View Request Status</center></h1></div>
        <div className="T_header">
        <h2 className='book123'>Name: {custname}</h2>
          <div className="T_border">
        
          <div>
          <label className="viewlab" htmlFor="cardType">Account Number
          <select
  className='salview12'
  value={accountNumber}
  onChange={(e) => setAccountNumber(e.target.value)}
  required
>
  <option key="default" value=''>Select</option>
  {accountData1.map((item) => (
    <option key={item.accountnumber} value={item.accountnumber}>
      {item.accountnumber}
    </option>
  ))}
</select>
            </label>
            <label className='reqlab12'> Request Type  
            <select
              className='reqType'
              name="requestType"
              value={requestType}
              onChange={handleChangeRequestType}  
            >
              <option value="0">Select</option>
              <option value="1">Cheque Book Request</option>
              <option value="2">Credit/Debit Card</option>
              <option value="3">Lost/Stolen Card</option>

            </select>
            </label>
          </div><br/>
          <div>
  <table className="Table">
    <thead>
      <tr className='viewtab'>
        <th>S.No</th>
        <th className='reqdate'>RequestDate</th>
        <th>ResponseStatus</th>
        <th className='res'>ResponseMessage</th>
        <th>ServiceId</th>
        <th>ResponseDate</th>
      </tr>
    </thead>
    <tbody>
    {["LostorStolen", "CHequeBook", "CreditorDebitCard"].map((type) => (
  responseData[type] && responseData[type].map((request, index) => (
    <tr className='viewstrow' key={index}>
      <td>{index + 1}</td>
      <td>{formatedate(request.requestdate)}</td>
      <td>{request.responsestatus}</td>
      <td>{request.responseMessage}</td>
      <td>{request.serviceid}</td>
      <td>{request.responseDate ? formatedate(request.responseDate) : '-'}</td>
    </tr>
  ))
))}
    </tbody>
  </table>
</div>
        <div className="T_SubmitController">
          <button className="T_Submit" onClick={Backoffice}><span>Back</span></button></div>
        </div>
        <div className="PagiNation">
            <button
              className="Prevbutton"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="Pagenumber">{currentPage}</span>
            <button
              className="Nextbutton"
              onClick={nextPage}
              disabled={currentItems.length < itemsPerPage}
            >
              Next
            </button>
          </div>
       </div>
    </div>
    </div>
  );
};

export default  RequestStatus;