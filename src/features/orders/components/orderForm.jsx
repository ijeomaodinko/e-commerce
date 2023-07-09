import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, getAllOrders, getOrderError, getOrderStatus } from '../orderSlice';
import { useEffect } from 'react';
import { getProductDetails } from '../../product/productSlice';
import { useLocation } from 'react-router-dom';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newOrder = { product, quantity };
        dispatch(createOrder(newOrder));
        setQuantity(1);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'error') {
        return <div>Error: {error}</div>;
    }

    const totalPrice = product?.price * quantity;

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
                    <p>${totalPrice}</p>
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
