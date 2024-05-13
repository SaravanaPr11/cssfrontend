import React from "react";
import { useNavigate } from "react-router-dom";
import './ServiceRequestMenu.css';

const ServiceRequestMenu = () => {
  const navigate = useNavigate();

  const checkhandle = () => {
    navigate("/ChequeBookRequest");
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

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="Service">
      <button className='menulogout' type="button" onClick={handleLogout}>Logout</button>
      <div className="Service-Container">
        <div className="Req">
          <h1>Service Request Menu</h1>
        </div>
        <div className="Linkcolor">
          <br />
          <button className="tag" onClick={checkhandle}>
            <i className="fa-solid fa-money-check"></i>
            <span>Request a new Cheque Book</span>
          </button>
          <button className="tag" onClick={cardhandle}>
            <i className="fa-solid fa-credit-card"></i>
            <span>Request a new Credit or Debit Card</span>
          </button>
          <button className="tag" onClick={stolenhandle}>
            <i className="fa-solid fa-person-circle-exclamation"></i>
            <span>Report Stolen / Lost Card</span>
          </button><br/>
        </div>
      </div>
      <button type="button" className="Backbutton" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default ServiceRequestMenu;