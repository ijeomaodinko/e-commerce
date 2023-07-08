import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductDetails, getAllCompanies, getAllCategories } from '../productSlice';
import './product.css';
import Container from '../../../components/Container';
import { addToCart } from '../../Cart/cartSlice';
import { fetchCompanies } from '../productSlice';
import { fetchCategories } from '../productSlice';

const ProductDetails = () => {
  const selectedProduct = useSelector(getProductDetails);
  const companies = useSelector(getAllCompanies);
  const categories = useSelector(getAllCategories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products); // Access the cart items from the Redux store

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

  const isInCart = (productId) => Object.keys(cart || {}).includes(productId.toString());

  if (!selectedProduct || selectedProduct.length === 0) {
    return <div>No product details found.</div>;
  }

  const product = selectedProduct[0];

  const company = companies.find((c) => c.id === product.company_id) || {};

  const category = categories.find((c) => c.id === product.category_id);

  const handleAddToCart = (product) => {
    if (isInCart(product.id)) {
      // Product is already in the cart, handle accordingly (e.g., show a notification)
      console.log('Product is already in the cart');
    } else {
      dispatch(addToCart(product));
      console.log(product);
    }
  };

  return (
    <Container>
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
            <div className='company'>
              <h3>Company</h3>
              <p>{company.name || 'Unknown Company'}</p>
            </div>
            <div className='category'>
              <h3>Category</h3>
              <p>{category ? category.name : 'Unknown Category'}</p>
            </div>
            <button disabled={isInCart(product.id)} onClick={() => handleAddToCart(product)}>Add to Cart</button>

            <button> Buy </button>            
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
