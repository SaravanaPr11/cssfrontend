import React from "react";
import { useNavigate } from "react-router-dom";
import './ServiceRequestMenu.css';

const ServiceRequestMenu = () => {
  const navigate = useNavigate();

 
  const checkhandle = () => {
    navigate("/ChequeBookRequest")
  };
  const cardhandle = () => {
    navigate("/CreditCardRequest");
  };
  const stolenhandle = () => {
    navigate("/StolenDebitCard");
  };



  const handleBack = () => {
    navigate("/CustomerServiceMenu");
  };
const handlelogout=()=>{
  navigate('/')
}
  return (
    <div className="Service">
      <button className='menulogout' type="button" onClick={handlelogout}>Logout</button>
      <div className="Service-Container">
        <div className="Req">
          <h1>Service Request Menu</h1>
        </div>
        <div className="Linkcolor">
          <br />
          <button className="tag" onClick={checkhandle}>Request a new Cheque book</button><br /><br />
          <button className="tag" onClick={cardhandle}>Request a new credit or debit Card</button><br /><br />
          <button className="tag" onClick={stolenhandle}>Report Stolen / Lost Card</button><br/><br/><br/>
        {/* <ul className="col">
          {serviceRequests.map((request) => (
            <li key={request.id}>
              <button onClick={() => handleRequestClick(request.id)}>
                <h2>{request.label}</h2>
              </button>
            </li>
          ))}</ul> */}
        
        </div>
        </div>
      <button type="button" className="Backbutton" onClick={handleBack}>
          Back
        </button>
        
     
    </div>
  );
};

export default ServiceRequestMenu;

