import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, getAllOrders, getOrderError, getOrderStatus } from '../orderSlice';

const OrderCard = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  const status = useSelector(getOrderStatus);
  const error = useSelector(getOrderError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>User ID: {order.user.id}</p>
            <p>Product ID: {order.product.id}</p>
            <p>Product Name: {order.product_name}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: {order.price}</p>
            <p>Company ID: {order.company_id}</p>
            <p>Company Name: {order.company.name || 'Unknown Company'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
