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
    setCount(count + 1);
  };

  return (
    <div onClick={navigateToCart} >
     <span className="productsCount" onClick={incrementCount}>{count}</span>
      <FaShoppingCart className="shoppingCart" alt="Go to Cart"  />
   </div>
  );
};
