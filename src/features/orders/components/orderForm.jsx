import React, { useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { createOrder, getAllOrders, getOrderError, getOrderStatus, fetchOrders } from '../orderSlice';
import { fetchCompanies, getAllCompanies } from '../../product/productSlice';
import { useEffect } from 'react';
import { getProductDetails } from '../../product/productSlice';
import { useLocation } from 'react-router-dom';
import Container from '../../../components/Container';



const OrderForm = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  const status = useSelector(getOrderStatus);
  const error = useSelector(getOrderError);
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = useSelector(getProductDetails);


  if (!selectedProduct || selectedProduct.length === 0) {
    return <div>No product details found.</div>;
  }

  const location = useLocation();
  const product = location.state?.product;

  const companies = useSelector(getAllCompanies);
  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);


  const company = companies.find((c) => c.id === product.company_id) || {};

  useEffect(() => {
    console.log(product);
  }, [product]);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPriceFormatted = product?.price * quantity;
  const totalPrice = typeof totalPriceFormatted === 'number' ? totalPriceFormatted.toFixed(2) : '0.00';


  const user = JSON.parse(sessionStorage.getItem('user'));

  const userId = user ? user.id : null;

  console.log(userId);

  const companyId = company && company.id ? company.id : null;
  console.log(companyId)


  const handleSubmit = () => {
    const order = {
      product_id: product.id,
      user_id: userId,
      product_name: product.name,
      quantity: quantity,
      price: totalPrice,
      company_id: companyId,
    };

    dispatch(createOrder(order))
      .then(() => {
        dispatch(fetchOrders()); 
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
    setQuantity(1);
    console.log(order);
  };


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error}</div>;
  }


  return (
    <Container>
      <h1>Order for Product</h1>
      <div key={product.id} className='order-details-container'>
        <div className='order-image'>
          <img src={product.img} alt={product.name} />
        </div>
        <div className='order-data'>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className='order-data-price'>${product.price}</p>
        </div>
        <div className='order-quantity'>

          <label>Quantity:</label>
          <button type="button" onClick={handleDecrement} className='orderQuantityBtn'>-</button>
          <span className='orderQuantity'>{quantity}</span>
          <button type="button" onClick={handleIncrement} className='orderQuantityBtn'>+</button>
          <div className='order-price'>
            <label>Total Price:</label>
            <span>${totalPrice}</span>
          </div>
          <button onClick={handleSubmit} className='orderBtn'>Place Order</button>
        </div>
      </div>
      <div>
        <h2>All Orders</h2>
        {orders.length === 0 ? (
        <p>Your order is empty.</p>
      ) : (
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
                    <p className='orderquanti'>Quantity: {order.quantity}</p>
                    <p className='orderPrice'> Price: ${order.price}</p>
                  </div>
                  <p className='ordercompany'>Company ID: {order.company_id}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </Container>
  );
};

export default OrderForm;
