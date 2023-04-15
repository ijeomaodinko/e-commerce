import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = ({logo, companyName}) => {
    const currentYear =new Date().getFullYear();
  return (
    <div className='footer'>
    <div className='footer_logo'>
        <Link to="/">
            <img src={logo} alt="logo" />
        </Link>
        <div className='footer_info'>
            &copy; {currentYear} {companyName}. All rights reserved.
        </div>
    </div>
    </div>
  );
};

export default Footer
