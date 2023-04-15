import React from 'react';
import { LOGO } from '../utils/contents';
import { string } from 'prop-types';
import Navbar from '../Navbar/Navbar';

const Container = ({children}) => {
  const loggedIn = true, isAdmin =true;
  const items = [
  { 
    title: "Home",
    url: '/',
    icon: '',
    access: 'all',
  },
  {
    title: "About",
    url: '/about',
    icon: '',
    access: 'all',
  },
  {
    title: "Admin",
    url: '/',
    icon: '',
    access: 'admin',
  },
  ];
  return (
    <div className='container'>
    <Navbar  logo={LOGO} loggedIn={loggedIn} isAdmin={isAdmin} items={items} />
      <div className='content'>  {children} </div>
    </div>
  )
}

export default Container
