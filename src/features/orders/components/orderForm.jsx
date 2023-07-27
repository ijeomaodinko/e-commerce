import React, { useState } from 'react';
import { useDispatch, useSelector, useStore  } from 'react-redux';
import { createOrder, getAllOrders, getOrderError, getOrderStatus, fetchOrders } from '../orderSlice';
import { fetchCompanies, getAllCompanies } from '../../product/productSlice';
import { useEffect } from 'react';
import { getProductDetails } from '../../product/productSlice';
import { useLocation } from 'react-router-dom';
import { selectUser,  selectIsAuthenticated } from '../../auth/authSlice';



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

    const totalPrice = product?.price * quantity;

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
  
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    //   },
    // };
  
    dispatch(createOrder(order))
    .then(() => {
        dispatch(fetchOrders()); // Fetch orders again after creating the new one to update the order list.
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
        <div>
            <h1>Product Details</h1>
            <div key={product.id} className='product-details-container'>
                <div className='product-image'>
                    <img src={product.img} alt={product.name} />
                </div>
                <div className='product-data'>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </div>
                <label>Quantity:</label>
                <button type="button" onClick={handleDecrement}>-</button>
                <span>{quantity}</span>
                <button type="button" onClick={handleIncrement}>+</button>
                <div>
                    <label>Total Price:</label>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <button onClick={handleSubmit}>Place Order</button>
            </div>
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
        </div>
    );
};

export default OrderForm;
