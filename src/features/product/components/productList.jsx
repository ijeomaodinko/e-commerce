import React from 'react';
import ProductCard from './productCard';
import './product.css';

const ProductList = ({products}) => {
  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductList;
