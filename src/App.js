import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Components/authContext';
import Footer from './Components/Footer';
import LoginForm from './Components/loginform'; // Adjust casing as per your component naming conventions
import MyAccount from './Components/MyAccount';
import AccountStatement from './Components/AccountStatement';
import ServiceRequestMenu from './Components/ServiceRequestMenu';
import CustomerServiceMenu from './Components/CustomerServiceMenu';
import RequestStatus from './Components/viewrequest'; // Adjust casing as per your component naming conventions
import ChequeBookRequest from './Components/ChequeBookRequest';
import StolenDebitCard from './Components/StolenDebitCard';
import CreditCardRequest from './Components/CreditCardRequest';
import Profile from './Components/profile';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute'; // Import the PrivateRoute component
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route exact path="/CustomerServiceMenu" element={<PrivateRoute element={<CustomerServiceMenu />} />} />
            <Route exact path="/MyAccount" element={<PrivateRoute element={<MyAccount />} />} />
            <Route exact path="/AccountStatement/:accountNumber" element={<PrivateRoute element={<AccountStatement />} />} />
            <Route exact path="/ServiceRequestMenu" element={<PrivateRoute element={<ServiceRequestMenu />} />} />
            <Route exact path="/ChequeBookRequest" element={<PrivateRoute element={<ChequeBookRequest />} />} />
            <Route exact path="/StolenDebitCard" element={<PrivateRoute element={<StolenDebitCard />} />} />
            <Route exact path="/CreditCardRequest" element={<PrivateRoute element={<CreditCardRequest />} />} />
            <Route exact path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route exact path="/view" element={<PrivateRoute element={<RequestStatus />} />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
