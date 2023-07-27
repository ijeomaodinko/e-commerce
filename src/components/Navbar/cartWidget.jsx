import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';


export const CartWidget = ({ productsCount }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(productsCount);

  const navigateToCart = () => {
    navigate('/cart');
  };

  const incrementCount = () => {
    setCount(count);
  };

  return (
    <div onClick={navigateToCart}  classN="cart-container">
     <p className="productsCount" onClick={incrementCount}>{count}</p>
      <FaShoppingCart className="shoppingCart" alt="Go to Cart" size={23}  />
      <p className='productCart'>Cart</p>
   </div>
  );
};
