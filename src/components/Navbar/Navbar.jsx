import React from 'react'
import PropTypes  from 'prop-types';
import NavItems from './NavItems';
import './nav.css';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../features/auth/authSlice';
import { LOGO } from '../utils/contents';


const Navbar =({ logo={LOGO}, items, loggedIn, isAdmin })=> {
  const dispatch = useDispatch();

  const filteredItems = items.filter((item) => {
    if (item.access === 'all'){
      return true;
    }
    if (item.access === 'loggedOut' && !loggedIn){
      return true;
    }
    if (item.access === 'loggedIn' && loggedIn){
      return  true;
    }
    if (item.access === 'admin' && loggedIn && isAdmin){
      return true;
    }
    return false;
  });

  const handleLogout = () => {
    dispatch(logOutUser)
  };

  return (
    <div className="navbar">
    <div className="navbar_logo">
      <img src= { logo } alt="logo" />
      </div>
      <div className='navbar_items'>
       {filteredItems.map((item) => (
        <NavItems key={item.title} item={item} />
       ))}
       { loggedIn === true && (
            <button className="navitem" onClick={ handleLogout }>
           <span className="navitem_title">Logout</span>
         </button>
       )}
     </div>
    </div>
  );
};

Navbar.propTypes = {
  items: PropTypes.array.isRequired,
  LOGO: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default Navbar;
