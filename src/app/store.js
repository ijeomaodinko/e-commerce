import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';

export default configureStore({
  reducer: {
        product: productReducer
  },
})