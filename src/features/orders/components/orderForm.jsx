import React, { useState } from 'react';
import { useDispatch, useSelector, useStore  } from 'react-redux';
import { createOrder, getAllOrders, getOrderError, getOrderStatus } from '../orderSlice';
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
    const user = useSelector(selectUser);

    if (!selectedProduct || selectedProduct.length === 0) {
        return <div>No product details found.</div>;
    }

    const location = useLocation();
    const product = location.state?.product;


    useEffect(() => {
        console.log(product);
    }, [product]);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const totalPrice = product?.price * quantity;
    
    const handleSubmit = () => {
        const order = {
          product_id: product.id,
          user_id: user?.id,
          company_id: product.company_id,
          quantity: quantity,
          price: totalPrice,
        };

        const config = {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        };
        dispatch(createOrder(order, config));
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
                <h2>Orders</h2>
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>{order.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderForm;
