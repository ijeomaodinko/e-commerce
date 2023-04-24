import React, { UseEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getAllProducts, fetchProduct, getProductStatus, getProductError } from './productSlice';

const porductIndex= () => {

  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const status = useSelector(getProductStatus);
  const error = useSelector(getProductError);

  UseEffect(() => {
    if (status === 'idle'){
      dispatch(fetchProduct());
    }
  }, [status, dispatch]);

    if (status === 'loading'){
      return <div>loading...</div>
    }

    if (status === 'error'){
      return <div>{error}</div>;
    }
  return (
    <div>
      
    </div>
  )
}

export default porductIndex
