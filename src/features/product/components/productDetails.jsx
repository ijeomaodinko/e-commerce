import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductDetails } from '../productSlice';
import './product.css';
import Container from '../../../components/Container';

const ProductDetails = () => {
  const selectedProduct = useSelector(getProductDetails);
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  if (!selectedProduct || selectedProduct.length === 0) {
    return <div>No product details found.</div>;
  }

  const product = selectedProduct[0]; 

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
              <p>{product.company && product.company.name}</p>
            </div>
            <div className='category'>
              <h3>Category</h3>
              <p>{product.category && product.category.name}</p>
            </div>
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
