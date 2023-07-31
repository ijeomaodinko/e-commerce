import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../cartSlice';
import { useEffect } from 'react';
import './cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div>
      <h2 className="cart-title">Shopping cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart">
          {cart.map((product) => (
            <li key={product.id}>
              <div className='cartinfo'>
              <div className="cart-company">
                <p>{product.company.name}</p> 
              </div>
              <div className="cart-product">
                <img src={product.img} alt={product.name} />
                <p>
                  {product.name} - ${product.price}/piece
                </p>
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
              </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
