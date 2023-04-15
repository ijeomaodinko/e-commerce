import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './nav.css';

const NavItems = ({ item }) => {
  return ( 
    <Link to={item.url} className="navitem">
       <div className="navitem_icon">{ item.icon && item.icon }</div>
      <div className="navitem_title">{ item.title}</div>
    </Link>
  );
};

NavItems.propTypes = {
  item: PropTypes.object.isRequired,
};

export default NavItems
