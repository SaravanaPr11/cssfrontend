import React, { useState, useEffect } from 'react';
import "./viewrequest.css";
import api from './api/Api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const RequestStatus = () => {
  const navigate = useNavigate();
  const custname = localStorage.getItem('name');
  const [requestType, setRequestType] = useState('0');
  const [accountNumber, setAccountNumber] = useState('');
  const customerId = localStorage.getItem("cid");
  const [responseData, setResponseData] = useState({
    LostorStolen: [],
    CHequeBook: [],
    CreditorDebitCard: []
  });
  const [accountData1, setAccountData1] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch account numbers when the component mounts
    getAllAccountData();
  }, []);

  useEffect(() => {
    if (accountData1.length > 0) {
      // Set default account number here
      setAccountNumber(accountData1[0].accountnumber);
    }
  }, [accountData1]);

  const Backoffice = () => {
    navigate("/CustomerServiceMenu")
  }

  const getAllAccountData = async () => {
    try {
      const response = await api.get(`/fetchAcc/${customerId}`);
      setAccountData1(response.data);
    } catch (error) {
      console.error('Error fetching all account data:', error);
    }
  };

const getAccountData = async () => {
  try {
    const response = await api.post('/getbyserviceid', {
      service_request_id: +requestType,
      accountNumber: +accountNumber
    });
    const filteredData = filterData(response?.data, requestType);
    setResponseData(filteredData);
  } catch (error) {
    console.error('Error fetching account data:', error);
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

  const filterData = (responseData, requestType) => {
    if (requestType === "0") {
      return responseData;
    } else {
      const filteredData = { LostorStolen: [], CHequeBook: [], CreditorDebitCard: [] };
  
      responseData.LostorStolen.forEach((request) => {
        if (request.serviceid === parseInt(requestType)) {
          filteredData.LostorStolen.push(request);
        }
      });
  
      responseData.CHequeBook.forEach((request) => {
        if (request.serviceid === parseInt(requestType)) {
          filteredData.CHequeBook.push(request);
        }
      });
  
      responseData.CreditorDebitCard.forEach((request) => {
        if (request.serviceid === parseInt(requestType)) {
          filteredData.CreditorDebitCard.push(request);
        }
      });
  
      return filteredData;
    }
  };
      
  const formatedate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  }

  const handleChangeRequestType = (e) => {
    setRequestType(e.target.value);
  }

  const handlelogout = () => {
    localStorage.clear();
    navigate('/')
  }

  const totalPages = (type) => {
    if (requestType === "0") {
      const data = responseData[type] || [];
      return Math.ceil(data.length / itemsPerPage);
    } else {
      const data = responseData[type] || [];
      return Math.ceil(data.length / itemsPerPage);
    }
  };

  console.log(itemsPerPage);

  return (
    <div className="srcont">
      <div className="T_Container">
        <button className='viewlogout' type="button" onClick={handlelogout}>Logout</button>
        <div className="T_title"><h1>View Request Status</h1></div>
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
            </div>
            <br />
            <div>
              <table className="Table">
                <thead>
                  <tr className='viewtab'>
                    <th>S.No</th>
                    <th className='reqdate'>Request Date</th>
                    <th>Response Status</th>
                    <th className='res'>Response Message</th>
                    <th>Service ID</th>
                    <th>Response Date</th>
                  </tr>
                </thead>
                <tbody>
                {(() => {
  if (requestType !== "0") {
    // Render for other request types
    // Combine all requests into one array
    const allRequests = [].concat(...Object.values(responseData));
    // Sort the requests by date in descending order
    const sortedRequests = allRequests.sort((a, b) => new Date(b.requestdate) - new Date(a.requestdate));
    // Slice the combined array based on the current page
    const slicedRequests = sortedRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return slicedRequests.map((request, index) => (
      <tr className='viewstrow' key={index}>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{formatedate(request.requestdate)}</td>
        <td>{request.responsestatus}</td>
        <td>{request.responseMessage}</td>
        <td>{request.serviceid}</td>
        <td>{request.responseDate ? formatedate(request.responseDate) : '-'}</td>
      </tr>
    ));
  } else {
    // Render for request type 0
    const requestsOfType0 = Object.keys(responseData).map((type) => responseData[type]).flat();
    // Sort the requests by date in descending order
    const sortedRequests = requestsOfType0.sort((a, b) => new Date(b.requestdate) - new Date(a.requestdate));
    // Slice the combined array based on the current page
    const slicedRequests = sortedRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return slicedRequests.map((request, index) => (
      <tr className='viewstrow' key={index}>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{formatedate(request.requestdate)}</td>
        <td>{request.responsestatus}</td>
        <td>{request.responseMessage}</td>
        <td>{request.serviceid}</td>
        <td>{request.responseDate ? formatedate(request.responseDate) : '-'}</td>
      </tr>
    ));
  }
})()}
                </tbody>
              </table>
              <div className="paginationControls">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <span>Page {currentPage}</span>
                <button disabled={currentPage === totalPages("LostorStolen")} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              </div>
            </div>
            <div className="T_SubmitController">
              <button className="T_Submit" onClick={Backoffice}><span>Back</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestStatus;
