import React from 'react';
import { COMPANY_NAME, LOGO } from '../utils/contents';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/footer';
import "./container.css";
import { useAuth } from '../utils/contents';
import { useAdmin } from '../utils/contents';

const Container = ({ children }) => {
  const loggedIn = useAuth();

  const isAdmin = useAdmin();

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
    title: "Add Product",
    url: '/products/new',
    icon: '',
    access: 'admin',
  },
  {
    title: "Admin",
    url: '/admin',
    icon: '',
    access: 'admin',
  },
  {
    title: "Login",
    url: '/auth/login',
    icon: '',
    access: 'loggedOut',
  },
  {
    title: "Signup",
    url: '/auth/signup',
    icon: '',
    access: 'loggedOut',
  }, 

  {
    title: "Order",
    url: '/orders',
    icon: '',
    access: 'all',
  },

  ];
  return (
    <div className='container'>
    <Navbar  logo={LOGO} loggedIn={loggedIn} isAdmin={isAdmin} items={items} />
      <div className='content'>  {children} </div>
    <Footer  logo={LOGO} companyName={COMPANY_NAME} />
    </div>
  )
}

export default Container
