import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="Logo" className="nav-logo" />
        <img src={navProfile} className='nav-profile' alt="Profile" />
    </div>
  );
};

export default Navbar;
