import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import './footer.css';
import {  LOGO, COMPANY_NAME } from '../utils/contents';


const Footer = ({logo = { LOGO }, companyName }) => {
    const currentYear =new Date().getFullYear();
  return (
    <div className='footer'>
    <div className='footer_logo'>
        <Link to="/">
            <img src={ LOGO } alt="logo" />
        </Link>
        </div>
        <div className='footer_info'>
            &copy; {currentYear} {COMPANY_NAME}. All rights reserved.
        </div>
    </div>
  );
};

export default Footer
