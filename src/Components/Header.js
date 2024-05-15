import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "./images/Logo.png"

function Header() {
  return (
    <header className='header'>
      <div className='log_left'>
        <img className='log' src={logo} alt="Logo"/>
      </div>
        <div className='logo'>
          <Link to="/">ABC Bank Services</Link>
        </div>
    </header>
  );
}

export default Header;
