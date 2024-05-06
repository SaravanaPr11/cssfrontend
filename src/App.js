import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Footer from "./Components/Footer";
import LoginForm from './Components/loginform';// Import your Loginpage component
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
          <Route exact path='/profile' element={<Profile />}></Route>
        </Routes>
        
        <Footer />
        </div>
    </BrowserRouter>
    
    
  );
}

export default App;

