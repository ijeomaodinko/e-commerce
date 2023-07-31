import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      state.push(product); 
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const index = state.findIndex((product) => product.id === productId);
      if (index !== -1) {
        state.splice(index, 1); 
      }
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.find((product) => product.id === productId);
      if (product) {
        product.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.find((product) => product.id === productId);
      if (product && product.quantity > 1) {
        product.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
