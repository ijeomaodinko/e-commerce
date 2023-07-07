import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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
