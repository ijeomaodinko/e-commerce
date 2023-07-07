import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductDetails, getAllCompanies, getAllCategories } from '../productSlice';
import './product.css';
import Container from '../../../components/Container';
import { addToCart } from '../../Cart/cartSlice';

const ProductDetails = () => {
  const selectedProduct = useSelector(getProductDetails);
  const companies = useSelector(getAllCompanies);
  const categories = useSelector(getAllCategories);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleGoBack() {
    navigate(-1);
  }

  if (!selectedProduct || selectedProduct.length === 0) {
    return <div>No product details found.</div>;
  }

  const product = selectedProduct[0];

  const company = companies.find((c) => c.id === product.company_id);
  const category = categories.find((c) => c.id === product.category_id);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log(product)
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
              <p>{company ? company.name : 'Unknown Company'}</p>
            </div>
            <div className='category'>
              <h3>Category</h3>
              <p>{category ? category.name : 'Unknown Category'}</p>
            </div>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
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
