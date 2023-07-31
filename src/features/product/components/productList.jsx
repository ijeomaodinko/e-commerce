import React, { useState, useMemo } from 'react';
import ProductCard from './productCard';
import './product.css';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleInputChange}
          className="searchBar" />
          <FaSearch  color='#e9e4e4'  size={20} className='searchIcon'/>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
