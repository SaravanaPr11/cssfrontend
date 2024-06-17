import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './authContext'; // Adjust path as necessary
import './CustomerServiceMenu.css';

function CustomerServiceMenu() {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Using useAuth to get access to logout function
    const custname = localStorage.getItem('name');

    const goToMyAccount = () => {
        navigate('/MyAccount');
    };

    const goToServiceRequestMenu = () => {
        navigate('/ServiceRequestMenu');
    };

    const goToProfilePage = () => {
        navigate('/profile');
    };

    const goToViewPage = () => {
        navigate('/view');
    };

    const handleBack = () => {
        window.history.back(); // This will go back in the history stack
    };

    const handleLogout = () => {
        logout(); // Call logout function from useAuth
        navigate('/'); // Redirect to login page
    };

    return (
        <div className="container">
            <div className="Wel">
                <h1>Welcome: {custname}</h1>
            </div>
            <div className="cust_ser">
                <div className="Customer">
                    <h1 className="t1">Customer Service Menu</h1>
                </div>
                <div className="Customer1">
                    <button className="icon-button" onClick={goToProfilePage}>
                        <i className="fa-solid fa-user"></i>
                        <span className="icontext">My Profile</span>
                    </button>
                    <button className="icon-button" onClick={goToMyAccount}>
                        <i className="fa-solid fa-file-invoice"></i>
                        <span>My Account</span>
                    </button>
                    <button className="icon-button" onClick={goToServiceRequestMenu}>
                        <i className="fa-solid fa-square-plus"></i>
                        <span>Make a Service Request</span>
                    </button>
                    <button className="icon-button" onClick={goToViewPage}>
                        <i className="fa-solid fa-person-circle-question"></i>
                        <span>View Request Status</span>
                    </button>
                </div>
                <div className="btn-box">
                    <button className="buttoncus" type="button" onClick={handleBack}>Back</button>
                    <button className="btnlogout" type="button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default CustomerServiceMenu;
