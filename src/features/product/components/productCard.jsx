import React from 'react';
import PropTypes from 'prop-types';
import './product.css';

const ProductCard = ({product}) => {
  return (
    <div key={product.id} className='productCard'>
        <img src={product.img} alt={product.name} />
      <h6>{product.name}</h6>
    <p>${product.price}</p>
    </div>
  );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};
export default ProductCard
