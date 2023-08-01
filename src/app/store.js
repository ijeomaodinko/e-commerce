import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/Cart/cartSlice';
import orderReducer from '../features/orders/orderSlice';
import reviewReducer from '../features/reviews /reviewSlice';

export default configureStore({
  reducer: {
        product: productReducer,
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        review: reviewReducer
  },
});