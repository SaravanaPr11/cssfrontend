import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Footer from "./Components/Footer";
import LoginForm from './Components/loginform';
import MyAccount from "./Components/MyAccount"; 
import AccountStatement from './Components/AccountStatement';
import ServiceRequestMenu from "./Components/ServiceRequestMenu";
import CustomerServiceMenu from "./Components/CustomerServiceMenu";
import Profile from './Components/profile';
import Header from './Components/Header';
import React from 'react';
import './App.css';

function App() {
  return (
   
    <BrowserRouter>
    <div>
      <Header />
       <Routes>
          <Route exact path='/' element={<LoginForm />} />
          <Route exact path='/CustomerServiceMenu' element={<CustomerServiceMenu />} />
          <Route exact path='/profile' element={<Profile />}></Route>
          <Route exact path='/MyAccount' element={<MyAccount />} />
          <Route exact path='/AccountStatement' element={<AccountStatement />} />
          <Route exact path='/ServiceRequestMenu' element={<ServiceRequestMenu />} />
        </Routes>
        <Footer />
        </div>
    </BrowserRouter>
    
    
  );
}

export default App;

