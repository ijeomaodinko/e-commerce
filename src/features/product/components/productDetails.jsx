import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductDetails } from '../productSlice';
import './product.css';
import Container from '../../../components/Container';

function ProductDetails() {
  const selectedProduct = useSelector(getProductDetails);
  const navigate = useNavigate();

  function handleGoBack(){
    navigate(-1);
  }
  return (
    <Container>
    <div>
      <h1> Product Details</h1>
      {selectedProduct.map((product) => (
        <div key = {product.id} className='product-details-container'>
          <div className='product-image'>
            <img src={product.img} alt={product.name} />
             </div>
             <div className='product-data'>
              <h2> {product.name}</h2>
              <p> {product.description}</p>
              <p> ${product.price}</p>
              <div className='company'>
                <h3> Company</h3>
                <p>{product.company.name}</p>
              </div>
              <div className='category'>
                <h3>Category</h3>
                <p> {product.category.name}</p>
              </div>
              <button onClick={handleGoBack}  type="button">
                Back 
                </button>
             </div>
        </div>
      ))}
    </div>
    </Container>
)
}

export default ProductDetails
