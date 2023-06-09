import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../cartSlice';
import { useEffect } from 'react';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    // Save cart data to local session storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <img src={product.img} alt={product.name} />
              {product.name} - ${product.price}
              <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
