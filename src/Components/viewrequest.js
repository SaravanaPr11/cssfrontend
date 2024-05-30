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
    navigate("/CustomerServiceMenu");
  };

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
    // Clear any sensitive data here
    localStorage.removeItem("cid");
    localStorage.removeItem("name");

    // Navigate to the login page and replace history
    navigate('/', { replace: true });
  };

  const getServiceType = (serviceid) => {
    switch(serviceid) {
      case 1:
        return 'Chequebook';
      case 2:
        return 'Credit/Debit Card';
      case 3:
        return 'Lost/Stolen Card';
      default:
        return 'Unknown Service';
    }
  };

  const totalPages = () => {
    let totalData = [];
    if (requestType !== "0") {
      totalData = [].concat(...Object.values(responseData)).filter((request) => request.serviceid === parseInt(requestType));
    } else {
      totalData = [].concat(...Object.values(responseData));
    }
    return Math.ceil(totalData.length / itemsPerPage);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(totalPages());
  };

  return (
    <div className="srcont">
      <div className="T_Container">
        <button className='viewlogout' type="button" onClick={handlelogout}>Logout</button>
        <div className="T_title"><h1>View Request Status</h1></div>
        <div className="T_header">
          <h2 className='book123'>Name: {custname}</h2>
          <div className="T_border">
            <div>
              <label className="viewlab" htmlFor="cardType">Account Number<span style={{ color: 'red' }}> *</span>
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
                    <th>Request Type</th>
                    <th className='reqdate'>Request Date</th>
                    <th className='res'>Request Message</th>
                    <th>Response Status</th>
                    <th>Response Message</th>
                    <th>Response Date</th>
                  </tr>
                </thead>
                <tbody>
                {(() => {
                  const allRequests = requestType !== "0" 
                    ? [].concat(...Object.values(responseData)).filter((request) => request.serviceid === parseInt(requestType))
                    : [].concat(...Object.values(responseData));
                  
                  const sortedRequests = allRequests.sort((a, b) => new Date(b.requestdate) - new Date(a.requestdate));
                  const slicedRequests = sortedRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                  
                  return slicedRequests.map((request, index) => (
                    <tr className='viewstrow' key={index}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{getServiceType(request.serviceid)}</td>
                      <td>{formatedate(request.requestdate)}</td>
                      <td className='resMsg'>{request.requestMessage}</td>
                      <td>{request.responsestatus}</td>
                      <td className='resMsg'>{request.responseMessage}</td>
                      <td className='resGrp'>{request.responseDate ? formatedate(request.responseDate) : '-'}</td>
                    </tr>
                  ));
                })()}
                </tbody>
              </table>
              <div className="paginationControls">
                <button className='Firstpg' onClick={firstPage} disabled={currentPage === 1}>&lt;&lt;</button>
                <button className='Prevpg' onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <span className='pgno'>{currentPage}</span>
                <button className='Nextpg' onClick={nextPage} disabled={currentPage === totalPages()}>Next</button>
                <button className='Lastpg' onClick={lastPage} disabled={currentPage === totalPages()}>&gt;&gt;</button>
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
