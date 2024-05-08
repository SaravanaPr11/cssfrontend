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
      const response = await api.get(`/accnumbers/${customerId}`); // Use the correct API endpoint
      setAccountData1(response.data);
      console.log('Account Numbers:', response);
    } catch (error) {
      console.error('Error fetching account numbers:', error);
    }
  };
 


  useEffect(() => {

    var obj = {
        service_request_id: +requestType,
        accountNumber:+accountNumber
    }

    if (requestType) {
         if(requestType === "0"){
            try {
              api.post('/getbyseviceid', obj).then((res)=>{
               console.log("loststolen response", res?.data);
     
               setResponseData(res?.data)
     
              })
               
             }
             catch (error) {
               console.log("Error", error);
             }
          }

       else if (requestType === "1") {
        try {
         api.post('/getbyseviceid', obj).then((res)=>{
          console.log("checkbook response", res?.data);

          setResponseData(res?.data)

         })
          
        }
        catch (error) {
          console.log("Error", error);
        }

      }else if(requestType === "2"){
        try {
          api.post('/getbyseviceid', obj).then((res)=>{
           console.log("creditdebit response", res?.data);
 
           setResponseData(res?.data)
 
          })
           
         }
         catch (error) {
           console.log("Error", error);
         }
      }else if(requestType === "3"){
        try {
          api.post('/getbyseviceid', obj).then((res)=>{
           console.log("loststolen response", res?.data);
 
           setResponseData(res?.data)
 
          })
           
         }
         catch (error) {
           console.log("Error", error);
         }
      }
    }
    

    // console.log("selected request",requestType,"statusss",status);
  }, [requestType])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = responseData.slice(indexOfFirstItem, indexOfLastItem);

  
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
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
    <div className="T_Container">
      <button className='viewlogout' type="button" onClick={handlelogout}>Logout</button>
        <div className="T_title"><h1><center>View Request Status</center></h1></div>
        <div className="T_header">
        <h2 className='book123'>Name: {custname}</h2>
          <div className="T_border">
        
          <div>
          <label className="viewlab" htmlFor="cardType">Account Number:
          <select
            className='salview'
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
            </label>
            <br/><br/>
            <label> Request Type:  </label>
            <select
              name="requestType"
              value={requestType}
              onChange={handleChangeRequestType}  
            >
              <option value="0">Select</option>
              <option value="1">Cheque Book Request</option>
              <option value="2">Credit/Debit Card</option>
              <option value="3">Lost/Stolen Card</option>

            </select>
          </div><br></br><br></br>
        <div >
          <table className="Table">
            <thead>
              <tr className='viewtab'>
              <th>S.No</th>
                <th className='reqdate'>RequestDate</th>
                <th>ResponseStatus </th>
                <th className='res'>ResponseMessage</th>
                <th>ServiceId</th>
                <th>ResponseDate</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems?.map((cd, index) => (
                  <tr className='viewclass'>
                    <th scope="row">{index + 1}</th>
                    <td> {formatedate(cd.requestdate)}</td>
                    {/* <td>{<a href="#" onClick={navigateToAccountDetails(cd.accountnumber)}>cd.accountnumber</a>}</td> */}
                    <td>{cd.responsestatus}</td>
                   <td>{cd.responseMessage}</td>
                   <td>{cd.serviceid}</td> 
                   <td>{cd.responseDate ? formatedate(cd.responseDate) : '-'}</td> {/*ternari operator*/}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="T_SubmitController">
          <button className="T_Submit" onClick={Backoffice}><span>Back</span></button></div>
        </div>
        <div className="Pagination">
            <button
              className="PrevButton"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="PageNumber">{currentPage}</span>
            <button
              className="NextButton"
              onClick={nextPage}
              disabled={currentItems.length < itemsPerPage}
            >
              Next
            </button>
          </div>
       </div>
    </div>
  );
};

export default  RequestStatus;