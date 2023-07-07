import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shoppingCart from '../../assets/shoppingCart';

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
    <button className="container" onClick={navigateToCart}>
      <span className="productsCount">{count}</span>
      <img src={shoppingCart} className="shoppingCart" alt="Go to Cart" />
    </button>
  );
};
