import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, getAllOrders, getOrderError, getOrderStatus } from '../orderSlice';
import './order.css';


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
            <div className='orderContainer'>
            <div className='orderImgContainer'>
              <p>Order ID: {order.id}</p>
              <p>User ID: {order.user.id}</p>
              <img src={order.product.img} alt={order.product_name} className='orderimg' />
            </div>
            <div className='orderInfo'>
              <div>

              <p>Product ID: {order.product.id}</p>
              <p className='orderProductName'>Product Name: {order.product_name}</p>
              <p className='orderCompanyName'> Company Name: {order.company.name || 'Unknown Company'}</p>
              </div>
              <div>
              <p>Quantity: {order.quantity}</p>
              <p className='orderPrice'> Price: ${order.price}</p>
              </div>
            </div>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default OrderCard;
