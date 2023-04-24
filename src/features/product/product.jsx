import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getAllProducts, fetchProducts, getProductStatus, getProductError } from './productSlice';
import ProductList from './components/productList';

const ProductIndex= () => {

  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const status = useSelector(getProductStatus);
  const error = useSelector(getProductError);

  useEffect(() => {
    if (status === 'idle'){
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

    if (status === 'loading'){
      return <div>loading...</div>
    }

    if (status === 'error'){
      return <div>{error}</div>;
    }
  return (
  <ProductList products ={products} />
  )
}

export default ProductIndex;
