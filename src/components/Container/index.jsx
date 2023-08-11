import React from 'react';
import { COMPANY_NAME, LOGO } from '../utils/contents';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/footer';
import "./container.css";
import { useAuth, useSeller } from '../utils/contents';
import { useAdmin } from '../utils/contents';
import { FaHome, FaSignInAlt, FaRegUser, FaHdd, FaAdn, FaShoppingBag } from 'react-icons/fa';


const Container = ({ children }) => {
  const loggedIn = useAuth();

  const isAdmin = useAdmin();

  const isSeller = useSeller();

  const user = JSON.parse(sessionStorage.getItem('user')); 

  const userName = user ? user.name : null; 

  console.log(userName);

  const items = [
    { 
      title: userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : '',
      url: '',
      icon: "Hello,",
      access: 'loggedIn',
    },
    { 
      title: "Home",
      url: '/',
      icon: <FaHome />,
      access: 'all',
    },
    {
      title: "About",
      url: '/about',
      icon: <FaHdd  />,
      access: 'all',
    },
  { 
    title: "Add Product",
    url: '/products/new',
    icon: '',
    access: 'seller',
  },
  {
    title: "Admin",
    url: '/admin',
    icon: <FaAdn />,
    access: 'admin',
  },
  {
    title: "Login",
    url: '/auth/login',
    icon: < FaSignInAlt />,
    access: 'loggedOut',
  },
  {
    title: "Signup",
    url: '/auth/signup',
    icon: <FaRegUser />,
    access: 'loggedOut',
  }, 

  {
    title: "Orders",
    url: '/orders',
    icon:  <FaShoppingBag />,
    access: 'loggedIn',
  },

  ];
  return (
    <div className='container'>
    <Navbar  logo={LOGO} loggedIn={loggedIn} isAdmin={isAdmin}  isSeller={isSeller}  items={items} />
      <div className='content'>  {children} </div>
    <Footer  logo={LOGO} companyName={COMPANY_NAME} />
    </div>
  )
}

export default Container
