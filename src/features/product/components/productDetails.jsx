import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductDetails, getAllCompanies, getAllCategories } from '../productSlice';
import './product.css';
import Container from '../../../components/Container';
import { addToCart } from '../../Cart/cartSlice';
import { fetchCompanies } from '../productSlice';
import { fetchCategories } from '../productSlice';
import { getAllProducts, selectProduct } from '../productSlice';
import { useAuth } from '../../../components/utils/contents';

const ProductDetails = () => {
  const selectedProduct = useSelector(getProductDetails) || [];
  const companies = useSelector(getAllCompanies);
  const categories = useSelector(getAllCategories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products); // Access the cart items from the Redux store

  const isloggedIn = useAuth();

  
  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Save cart data to local session storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function handleGoBack() {
    navigate(-1);
  }

  const products = useSelector(getAllProducts);
  const handleOrder = (productId) => {

    if (!selectedProduct[0]) {
      console.log('No product selected');
      return;
    }

    const response = selectedProduct[0]; 
    dispatch(selectProduct(response));
    navigate('/orderform', { state: { product: response } }); 
    console.log(response, 'order, click response');
  };
  

  const isInCart = (productId) => Object.keys(cart || {}).includes(productId.toString());

  if (!selectedProduct || selectedProduct.length === 0) {
    return <div>No product details found.</div>;
  }

  const product = selectedProduct[0];

  
  const company = companies.find((c) => c.id === product.company_id) || {};
  
  const category = categories.find((c) => c.id === product.category_id);
  
  const handleAddToCart = (product) => {
    if (isInCart(product.id)) {
      console.log('Product is already in the cart');
    } else {
      dispatch(addToCart(product));
      console.log(product);
    }
  };

  if (!product || !product.company_id) {
    return <div>Product data is incomplete.</div>;
  }

  return (
    <Container>
      <div className='product-detail-container'>
        <h1>Product Details</h1>
        <div key={product.id} className='product-details-container'>
          <div className='product-image'>
            <img src={product.img} alt={product.name} />
          </div>
          <div className='product-data'>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className='company'>
              <h3>Company: 
              <span>{company.name || 'Unknown Company'}</span>               
              </h3>
            </div>
            <div className='category'>
              <h3>Category:
              <span>{category ? category.name : 'Unknown Category'}</span> 
              </h3>
            </div>
            { isloggedIn &&   <button disabled={isInCart(product.id)} onClick={() => handleAddToCart(product)}>Add to Cart</button>}
          
       { isloggedIn && <button onClick={handleOrder}>Order</button> }
            
            <button onClick={handleGoBack} type='button'>
              Back
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
