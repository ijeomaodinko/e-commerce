import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, getAllOrders, getOrderError, getOrderStatus } from '../orderSlice';

const Order = () => {
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
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
